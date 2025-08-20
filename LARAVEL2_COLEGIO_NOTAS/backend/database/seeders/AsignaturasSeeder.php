<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Asignatura;

class AsignaturasSeeder extends Seeder
{
public function run()
    { 
        $asignaturas = ['Matematicas', 'Fisica', 'Biologia', 'Quimica',
        'Historia', 'Dibujo', 'Economia', 'Programacion', 'Informatica', 'Literatura',];

        foreach ($asignaturas as $asignatura) {
            Asignatura::create(['nombre' => $asignatura]);
}
}
}