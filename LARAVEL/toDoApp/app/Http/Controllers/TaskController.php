<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class TaskController extends Controller
{
    /** Display a listing of the resource.*/
    
   public function index(Request $request)
{
    $query = \App\Models\Task::with(['user', 'category']);

    if ($request->filled('user_id')) {
        $query->where('user_id', $request->user_id);
    }

    if ($request->filled('category_id')) {
        $query->where('category_id', $request->category_id);
    }

    if ($request->filled('status')) {
        if ($request->status === 'completed') {
            $query->where('is_completed', true);
        } elseif ($request->status === 'pending') {
            $query->where('is_completed', false);
        }
    }

    $tasks = $query->get();

    return view('tasks.index', compact('tasks'));
}

    /** Show the form for creating a new resource.*/
    public function create()
    {
    $users = \App\Models\User::all();
    $categories = \App\Models\Category::all();

    return view('tasks.create', compact('users', 'categories'));  
    }

    /** Store a newly created resource in storage.*/
    public function store(Request $request)
    {
        $validated = $request->validate([
        'title' => 'required|string|max:255',
        'description' => 'nullable|string',
        'user_id' => 'required|exists:users,id',
        'category_id' => 'nullable|exists:categories,id',
        'is_completed' => 'nullable|boolean',
    ]);

    $validated['is_completed'] = $request->has('is_completed');

    \App\Models\Task::create($validated);

    return redirect()->route('tasks.index')->with('success', 'Tarea creada con éxito.');
    }

    /** Display the specified resource. */
    public function show(string $id)
    {
        //
    }

    /** Show the form for editing the specified resource.*/
    public function edit($id)
    {
    $task = \App\Models\Task::findOrFail($id);
    $users = \App\Models\User::all();
    $categories = \App\Models\Category::all();

    return view('tasks.edit', compact('task', 'users', 'categories'));
    }

    /** Update the specified resource in storage.*/
    public function update(Request $request, $id)
    {
        $task = \App\Models\Task::findOrFail($id);

    $validated = $request->validate([
        'title' => 'required|string|max:255',
        'description' => 'nullable|string',
        'user_id' => 'required|exists:users,id',
        'category_id' => 'nullable|exists:categories,id',
        'is_completed' => 'nullable|boolean',
    ]);

    $validated['is_completed'] = $request->has('is_completed');

    $task->update($validated);

    return redirect()->route('tasks.index')->with('success', 'Tarea actualizada con éxito.');
    }

    /** Remove the specified resource from storage.*/
    public function destroy($id)
    {
    $task = \App\Models\Task::findOrFail($id);
    $task->delete();

    return redirect()->route('tasks.index')->with('success', 'Tarea eliminada con éxito.');  
    }

    //funcion para cambiar de completado a no completado o al reves
    public function toggleCompleted($id)
{
    $task = \App\Models\Task::findOrFail($id);
    $task->is_completed = !$task->is_completed;
    $task->save();

    return redirect()->route('tasks.index')->with('success', 'Tarea actualizada.');
}
}
