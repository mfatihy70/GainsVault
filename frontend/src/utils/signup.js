export const handleSignup = async (name, surname, email, password, confirmPassword, address, phone, setError, navigate) => {
    console.log(
      `Register clicked with: ${name}, ${surname}, ${email}, ${password}, ${confirmPassword}, ${address}, ${phone}`
    )
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email, password })
    });

    const data = await res.json();
    console.log(data);

    localStorage.setItem('token', data.token); // Save token
    navigate('/profile'); // Redirect to profile page

    //alert("Register clicked, in development")
}