import React,{useState} from "react";
import './Login.css'
import "@fontsource/roboto-slab"
import { useNavigate } from "react-router-dom";


export const Login = () =>{
    const navigate = useNavigate()
    const [email, setEmail] = useState("");
    const [password,setPassword] = useState("");

    let handleSubmit = async (e) => {
        e.preventDefault();
        let data = {
            email : email,
            password : password
        }
        try{
            let res = await fetch("http://localhost:5001/api/v1/auth/login", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)}
      );
      // eslint-disable-next-line
        let response = await res.json();

        let token = response.token
        let id = response.payloadData.id
        localStorage.setItem('token',token);
        localStorage.setItem('id',id);
        navigate('/');

        } catch (err){
            console.log(err);   
        }

    }
    

return(<div id="login">

    
    <div>
        <div className='top'><div className='heading1'><h1>Log In</h1></div>
        <div className='Topline'></div></div>
    </div>


    <div className="Down">
        <div className="Left">
            <div className="WelocomeHeading"><h1>Welcome to</h1><h1>Baby's</h1></div>

            <div className="Discription"><p>All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.</p></div>
        </div>

        <div className="Right">
            
            <label className="email">Email:</label>
            <input 
                type='text'
                placeholder="user@domain.com"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
            />

            <label className="password">Password:</label>
            <input 
                type='password'
                placeholder="********"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                        
            />
            <button onClick={handleSubmit}>Log in</button>
            

        </div>



    </div>

</div>

)
}