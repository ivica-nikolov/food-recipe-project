import React,{useState} from "react";
import './CreateAccount.css'


export const CreateAccount = () => {
   
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [birthday, setBirthday] = useState("");
    const [password,setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [message, setMessage] = useState("");

    let handleSubmit = async (e) => {
        e.preventDefault();
        
        if (password !== repeatPassword) {
            setMessage("Passwords don't match")
            throw new Error("Passwords does't match") 
        }

        let data = {
            firstName : firstName,
            lastName : lastName,
            email : email,
            birthday : birthday,
            password : password
        }
        try{
            let res = await fetch("http://localhost:5001/api/v1/auth/create-user", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)}
      );
      // eslint-disable-next-line
      let response = await res.json();
      
      if (res.status === 200) {
        setMessage('User created successfully!!!');
      }else {
        setMessage("Some error ocured");
      }
        } catch (err){
            console.log(err);   
        }
    }


    return (<div className="createaccount">
    
    <div>
        <div className='top'><div className='headingg1'><h1>Create Account</h1></div>
        <div className='topline'></div></div>
    </div>


    <div className="DOWN">
        <div className="LEFT">
            <div className="createHeading"><h1>Create your</h1><h1>account</h1></div>

            <div className="discriptionn"><p>All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable.</p></div>
        </div>
        <form  onSubmit={handleSubmit}>
        <div className="Rightt">

            <label>First Name</label>
            <input 
                type='text'
                placeholder="John"
                value={firstName}
                onChange={(e)=>setFirstName(e.target.value)}
            />
            <label>Email</label>
            <input 
                type='text'
                placeholder="john@smith.com"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
            />
            <label>Password</label>
            <input 
                type='password'
                placeholder="********"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                    
            />
            <div className="message">{message ? <p>{message}</p> : null}</div>
            <button type="submit">Create Account</button>
            

        </div>

        <div className="Rightt">

            <label >Last Name</label>
            <input 
                type='text'
                placeholder="Smith"
                value={lastName}
                onChange={(e)=>setLastName(e.target.value)}
            />
            <label >Birthday</label>
            <input type='date' className="date"
                value={birthday}
                onChange={(e)=>setBirthday(e.target.value)}
            />
            <label >Reapeat Password</label>
            <input 
                type='password'
                placeholder="********"
                value={repeatPassword}
                onChange={(e)=>setRepeatPassword(e.target.value)}
                    
            />


        </div>
        </form>
    </div>
    
 </div>

)}