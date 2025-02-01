<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Products;

class ProductsController extends Controller
{
    public function index()
    {
        $products = Products::latest()->get();

        return inertia('Products/Index', [
            'products' => $products
        ]);
    }

    public function create(){
        return inertia("Products/Create");
    }

    public function store(Request $request){
        $validate = $request->validate([
            'name'=>'required',
            'price'=>'required',
            'category'=>'required',
            'qty'=>'required',
            'image'=>'nullable|image|mimes:jpeg,png,jpg|max:2048',

        ]);

        if($request->hasFile('image')){
            $imagePath = $request->file('image')->store('products', 'public')  ;
            $validate['image'] = $imagePath;
        }

        Products::create($validate);

        return redirect()->route("products.index")->with('success','Data berhasil di simpan!');


    }
}
