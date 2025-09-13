<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class produk extends Model
{
    use HasFactory;
    protected $table = 'produk';
    protected $primaryKey = 'ID_PRODUK';
    public $timestamps = false;
    protected $fillable = [
        'NAMA_PRODUK'
    ];

    public function barang()
    {
        return $this->hasMany(dataset::class);
    }

}
