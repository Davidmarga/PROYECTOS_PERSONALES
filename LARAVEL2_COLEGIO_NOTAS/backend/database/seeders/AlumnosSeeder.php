<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Asignatura;
use Illuminate\Support\Facades\Hash;

class AlumnosSeeder extends Seeder
{
    public function run()
    {
        $nombres = [
            'Valeria Torres', 'Lucas Moreno', 'Camila Ríos', 'Mateo Fernández',
            'Sofía Herrera', 'Andrés Jiménez', 'Isabella Duarte', 'Tomás Vega',
            'Martina Salazar', 'Nicolás Ramírez', 'Fernanda Soto', 'Emilio Cruz',
            'Renata López', 'Daniel Paredes', 'Julieta Díaz', 'Diego Navarro',
            'Agustina León', 'Benjamín Silva', 'Josefa Álvarez', 'Sebastián Reyes',
        ];

        $asignaturas = Asignatura::all();

        foreach ($nombres as $index => $nombreCompleto) {
            $email = 'alumno' . ($index + 1) . '@ejemplo.com';
            $user = User::create([
                'name' => $nombreCompleto,
                'email' => $email,
                'password' => Hash::make('password'),
                'is_admin' => false,
            ]);

            // Relacionar con 8 asignaturas aleatorias, con nota
            $asignaturasAleatorias = $asignaturas->random(8);

            foreach ($asignaturasAleatorias as $asignatura) {
                $user->asignaturas()->attach($asignatura->id, [
                    'nota' => rand(50, 100) / 10, // genera notas entre 5.0 y 10.0
                ]);
            }
        }

        // Crear admin
        User::create([
            'name' => 'Administrador General',
            'email' => 'admin@ejemplo.com',
            'password' => Hash::make('admin123'),
            'is_admin' => true,
        ]);
    }
}