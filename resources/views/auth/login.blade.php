@extends('layouts.base')

@section('content')
<div class="login container">
    <div class="row justify-content-center">
        <img class="bank-icon" src="{{URL::asset('/images/bank.png')}}" alt="bank icon">
    </div>
   <div class="row justify-content-center">
        <div class="col-md-4 login-box">
        <form method="POST" action="{{ route('login') }}">
            @csrf
            <h2 class="login-title">Iniciar Sesion</h2>
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
                <a class="recovery-password-link" href="{{ route('password.request') }}">Recuperar contraseña</a>
                <input name="password" type="password"placeholder="Contraseña" class="form-control @error('password') is-invalid @enderror" value="{{ old('password') }}" id="password">
                @error('password')
                    <span class="invalid-feedback" role="alert">
                        <strong>{{ $message }}</strong>
                    </span>
                @enderror
            </div>
            <button type="submit" class="btn btn-primary">INICIAR SESION</button>
            <div class="register-account-link text-center">
                ¿No tienes cuenta? <a class="text-center"  href="{{ route('register') }}">Crea una</a>
            </div>
         </form>
        </div>
   </div>
</div>
@endsection
