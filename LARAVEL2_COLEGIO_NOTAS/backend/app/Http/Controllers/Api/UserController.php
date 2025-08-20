<?php

namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Models\Asignatura;

class UserController extends Controller
{
// MOSTRAR TODAS LAS ASIGNATURAS 
    public function indexAsig(){

        $asignaturas = Asignatura::all();
        return response()->json($asignaturas);
    }

    //MOSTRAR TODOS LOS USUARIOS (PERO HABRIA QUE TRAER SOLO EL NOMBRE Y LA ID, FUNCION DE APOYO PARA SELECCIONAR UNO Y LUEGO PODER BORRARLOS)
    public function usuarios()
    {
        $usuarios = User::all();

        $datos = $usuarios->map(function ($user){
            return [
                'user_id'=>$user->id,
                'nombre'=>$user->name,
                'is_admin'=>$user->is_admin,
            ];
         });
     return response()->json($datos);

    }





// MOSTRAR SUS PROPIAS ASIGNATURAS (PARA EL ALUMNO)

    public function indexOwn(Request $request)
    {
        $user=$request->user();
        if ($user->is_admin){
            return response ()->json(['message'=>'solo accesible para alumnos'],403);
        }
        $asignaturas = $user->asignaturas()
            ->withPivot('nota')
            ->select('nombre')//evita traer campos innecesarios
            ->get()
            ->map(function($asignatura){
                return[
                    'nombre'=>$asignatura->nombre,
                    'nota'=>$asignatura->pivot->nota,
                ];
            });

        return response()->json([
            'alumno'=>$user->name,
            'email' => $user->email,
            'asignaturas' => $asignaturas,
        ]);
    }

// MOSTRAR TODOS LOS USUARIOS CON SUS ASIGNATURAS (PARA EL ADMINISTRADOR)

    public function indexAll(){

         $user = auth()->user();//devuelve el usuario autenticado con el token o en la sesion actual

         if (!$user->is_admin) {
        return response()->json(['message' => 'Acceso denegado'], 403);
    }
    //selecciono todos los users, con sus asignaturas (solo id y nombre de asignatura)
        $users = User::with(['asignaturas' => function($query) {
        $query->select('asignaturas.id', 'nombre');
    }])->get();

    // Mapear para mostrar los datos que quiero de id, y de asignaturas solo nombre, y nota, que 
    //se saca del pivot con asignatura id que era el otro parametro cogido arriba
    $result = $users->map(function($user) {
        return [
            'id' => $user->id,
            'nombre' => $user->name,
            'email' => $user->email,
            'is_admin' => $user->is_admin,
            'asignaturas' => $user->asignaturas->map(function($asignatura) {
                return [
                    'id'=>$asignatura->id,
                    'nombre' => $asignatura->nombre,
                    'nota' => $asignatura->pivot->nota,
                ];
            }),
        ];
    });

    return response()->json($result);

    }

//GUARDAR UN NUEVO USUARIO (PARA EL ADMIN)
  
    public function store(Request $request)
    {
        $user = auth()->user();//devuelve el usuario autenticado con el token o en la sesion actual

        if (!$user->is_admin){
        return response()->json(['message' => 'Acceso denegado'], 403);
        }

        $validated=$request->validate([
            'name'=> 'required|string|max:255',
            'email'=> 'required|email|unique:users,email',
            'password'=> 'required|string|min:6',
            'is_admin'=> 'boolean',
        ]);

        $newUser = User::create([
        'name' => $validated['name'],
        'email' => $validated['email'],
        'password' => Hash::make($validated['password']),
        'is_admin' => $validated['is_admin'] ?? false,
    ]);

    return response()->json($newUser, 201);

    }

//ACTUALIZAR NOTA DE UN USUARIO (PARA ADMIN)

    public function updateNota(Request $request, $userId, $asignaturaId) //request sera un json que ira en el cuerpo de la api, y userId y asignaturaId iran en la url
    {

    $user = auth()->user();
    if (!$user->is_admin) {
    return response()->json(['message' => 'Acceso denegado'], 403);
    }
    $validated = $request->validate([
    'nota' => 'required|numeric|min:0|max:10',
    ]);

    $userToUpdate = User::find($userId);
    if (!$userToUpdate) {
    return response()->json(['message' => 'Usuario no encontrado'], 404);
    }

    // Verificamos si el usuario tiene esa asignatura
    if (!$userToUpdate->asignaturas()->where('asignatura_id', $asignaturaId)->exists()) {
    return response()->json(['message' => 'Asignatura no encontrada para este usuario'], 404);
    }
    $userToUpdate->asignaturas()->updateExistingPivot($asignaturaId, ['nota' => $validated['nota']]);
    return response()->json(['message' => 'Nota actualizada correctamente']);
    }

    //ASIGNAR UNA ASIGNATURA A UN USUARIO (PARA ADMIN)

    public function asignarAsignatura(Request $request, $userId){

    $admin = auth()->user();
    if (!$admin->is_admin) {
    return response()->json(['message' => 'Acceso denegado'], 403);
    }
     $validated = $request->validate([
    'asignatura_id' => 'required|exists:asignaturas,id',
    ]);
    $user = User::find($userId);
    if (!$user) {
    return response()->json(['message' => 'Usuario no encontrado'], 404);
    }
  // Verifica si ya tiene asignada la asignatura
    if ($user->asignaturas()->where('asignatura_id', $validated['asignatura_id'])->exists()) {
    return response()->json(['message' => 'El usuario ya tiene esta asignatura'], 400);
    }
     // Asignar la asignatura sin nota
    $user->asignaturas()->attach($validated['asignatura_id']);

    return response()->json(['message' => 'Asignatura asignada correctamente']);
}

// ELIMINAR ASIGNATURA DE UN USUARIO (PARA ADMIN)

public function eliminarAsignatura($userId, $asignaturaId){

    $admin = auth()->user();
    if (!$admin->is_admin) {
        return response()->json(['message' => 'Acceso denegado'], 403);
    }
    $user = User::find($userId);
    if (!$user) {
    return response()->json(['message' => 'Usuario no encontrado'], 404);
    }

     // Verifica si la asignatura está asociada
    if (!$user->asignaturas()->where('asignatura_id', $asignaturaId)->exists()) {
        return response()->json(['message' => 'El usuario no tiene esta asignatura'], 400);
    }
    // Eliminar relación
    $user->asignaturas()->detach($asignaturaId);

    return response()->json(['message' => 'Asignatura eliminada correctamente']);
}
// ELIMINAR UN USUARIO (PARA ADMIN)

   public function destroy($id)
{
    $user = auth()->user();
    if (!$user->is_admin) {
        return response()->json(['message' => 'Acceso denegado'], 403);
    }

     $toDelete = User::find($id);
    if (!$toDelete) {
        return response()->json(['message' => 'Usuario no encontrado'], 404);
    }

    $toDelete->delete();
    return response()->json(['message' => 'Usuario eliminado correctamente']);
    }
}
