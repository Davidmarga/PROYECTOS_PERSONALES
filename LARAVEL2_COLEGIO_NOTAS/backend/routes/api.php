<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\AuthController;

Route::post('/login', [AuthController::class, 'login']);

    Route::middleware('auth:sanctum')->group(function () {
    Route::get('/asignaturas', [UserController::class, 'indexAsig']);
    Route::get('/usuarios',[UserController::class, 'usuarios']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);
    Route::get('/alumno/asignaturas', [UserController::class, 'indexOwn']);
    Route::get('/admin/usuarios', [UserController::class, 'indexAll']);
    Route::post('/admin/usuarios', [UserController::class, 'store']);
    Route::delete('/admin/usuarios/{id}', [UserController::class, 'destroy']);
    Route::put('/admin/usuarios/{userId}/asignaturas/{asignaturaId}', [UserController::class, 'updateNota']);
    Route::post('/admin/usuarios/{userId}/asignaturas', [UserController::class, 'asignarAsignatura']);
    Route::delete('/admin/usuarios/{userId}/asignaturas/{asignaturaId}', [UserController::class, 'eliminarAsignatura']);

});