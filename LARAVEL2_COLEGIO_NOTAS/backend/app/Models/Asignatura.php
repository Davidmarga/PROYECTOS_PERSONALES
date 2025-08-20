<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Asignatura extends Model
{
    use HasFactory;

    protected $fillable = [
    'nombre',
    
    ];

        public function users()
    {
        return $this->belongsToMany(User::class)
         ->withPivot('nota');
    }
}
