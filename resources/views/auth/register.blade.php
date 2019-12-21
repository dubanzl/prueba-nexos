@extends('layouts.base')

@section('content')
<div class="register container">
    <div class="row justify-content-center">
        <img class="bank-icon" src="{{URL::asset('/images/bank.png')}}" alt="bank icon">
    </div>
   <div class="row justify-content-center">
        <div class="col-md-4 register-box">
        <form method="POST" action="{{ route('register') }}">
            @csrf
            <h2 class="login-title">Registrarse</h2>

            <div class="form-group">
                <label for="name">Nombre</label>
                <input id="name" type="name" placeholder="Nombre" class="form-control @error('name') is-invalid @enderror" aria-describedby="Nombres" name="name" value="{{ old('name') }}" >
                @error('name')
                    <span class="invalid-feedback" role="alert">
                        <strong>{{ $message }}</strong>
                    </span>
                @enderror
            </div>
            <div class="form-group">
            <div class="form-group">
                <label for="email">Correo electrónico</label>
                <input id="email" type="email" placeholder="Correo electrónico" class="form-control @error('email') is-invalid @enderror" aria-describedby="correo electrónico" name="email" value="{{ old('email') }}" >
                @error('email')
                    <span class="invalid-feedback" role="alert">
                        <strong>{{ $message }}</strong>
                    </span>
                @enderror
            </div>
            <div class="form-group">
                <label for="password">Contraseña</label>
                <input id="password" placeholder="Contraseña" type="password" class="form-control @error('password') is-invalid @enderror" name="password" autocomplete="new-password">

                @error('password')
                    <span class="invalid-feedback" role="alert">
                        <strong>{{ $message }}</strong>
                    </span>
                @enderror

            </div>

            <div class="form-group">
                <label for="password-confirm">Confirmar Contraseña</label>
                <input id="password-confirm" placeholder="Confirmar Contraseña" type="password" class="form-control" name="password_confirmation" autocomplete="new-password">
            </div>
            <button type="submit" class="btn btn-primary">REGISTRARSE</button>
            <div class="register-account-link text-center">
                ¿Ya tienes cuenta? <a class="text-center"  href="{{ route('login') }}">Inicia sesión aquí</a>
            </div>
         </form>
        </div>
   </div>
</div>
@endsection
