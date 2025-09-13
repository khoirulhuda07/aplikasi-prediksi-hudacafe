<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class dataset extends Model
{
    use HasFactory;
    protected $table = 'penjualan';
    protected $primaryKey = 'ID_PENJUALAN';
    public $timestamps = false;
    protected $fillable = [
        'ID_PRODUK',
        'BULAN',
        'JUMLAH'
    ];

    public function produk(){
        return $this->belongsTo(produk::class, 'ID_PRODUK');
    }
}
