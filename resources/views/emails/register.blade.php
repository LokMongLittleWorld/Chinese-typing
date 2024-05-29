@component('mail::message')
    
<p>Hello {{ $user->name }}</p>

{{-- @component('mail::button', ['url' => url('api/verify/' . $token)]) --}}
@component('mail::button', ['url' => $url])
Verify
@endcomponent

<p>If there is no response after clicking the button, please try to click the link:</p>
{{-- <a href="{{url('api/verify/' . $token)}}" target="_blank">{{url('api/verify/' . $token)}}</a>  --}}
<a href="{{$url}}" target="_blank">{{$url}}</a>
<p>In case you have issue please contact us.</p>

Thanks<br/>
{{ config('app.name') }}

@endcomponent