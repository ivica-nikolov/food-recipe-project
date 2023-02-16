import React,{useState,useEffect} from "react";
import './MyProfile.css'
import "@fontsource/roboto-slab"
import image from '../../images/no-profile-pic-icon-27.jpg'


export const MyProfile = () =>{
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [birthday, setBirthday] = useState("")
    const [password, setPassword] = useState("")
    const [repeatPassword, setRepeatPassword] = useState("")
    const [message, setMessage] = useState("");
    const [imageName, setImageName] = useState()
    
    const fetchData = async () => {
        let userId = localStorage.getItem('id')
        let token = localStorage.getItem("token")
        try{
            await fetch(`http://localhost:5001/api/v1/auth/get-profile/${userId}`, {
            method: "GET",
            headers: {
                'Content-type': 'application/json',
                'Authorization': token ? `Bearer ${token}` : ''
            },
            
        }
        ).then((res) => res.json())
        .then((data) => {
            setFirstName(data.firstName)
            setLastName(data.lastName)
            setEmail(data.email)
            setBirthday(data.birthday)
            setImageName(data.image)
            
        })
            
        } catch (err){
            console.log(err);   
        }
    }

    useEffect(() => {
        fetchData()
        // eslint-disable-next-line
    },[])

    const handlePhoto = async (e) => {
        e.preventDefault();
        let formData = new FormData();
        formData.append('image', e.target.files[0])
        
        try{
            let res = await fetch(`http://localhost:5001/api/v1/storage`, {
            method: "POST",
            headers: {
                
            },
            body: formData}
            
            );
           
            // eslint-disable-next-line
            let response = await res.json();
            
        } catch {

        }
        setImageName(e.target.files[0].name)
    }

    let handleSubmit = async (e) => {
        e.preventDefault();
        let token = localStorage.getItem("token")
        let id = localStorage.getItem('id')
        if (password == '') {
            setMessage("Enter password")
            throw new Error("Passwords does't match")
        }else if (password !== repeatPassword) {
            setMessage("Passwords don't match")
            throw new Error("Passwords does't match") 
        }
        
        const formData = new FormData();
        formData.append('image', imageName);
        formData.append('firstName', firstName);
        formData.append('lastName', lastName);
        formData.append('birthday', birthday);
        formData.append('email', email);
        formData.append('password', password);
        
        
        // for (const value of formData.values()) {
        //     console.log(value);
        //   }
        
        try{
            let res = await fetch(`http://localhost:5001/api/v1/auth/edit-profile/${id}`, {
            method: "POST",
            headers: {
                'Authorization': token ? `Bearer ${token}` : ''
            },
            body: formData}
            
      );

      // eslint-disable-next-line
      let response = await res.json();
      
      if (res.status === 200) {
        setMessage('User updated successfully!!!');
      }else {
        setMessage("Email already");
      }
        } catch (err){
            console.log(err);   
        }
    }


    return(<div id="myprofile">

    <div>
        <div className='top'><div className='h'><h1>My Profile</h1></div>
        <div className='linetop'></div></div>
    </div>
    <div className="downn">
        <div className="left">
            <div className="pic">{imageName ? <img src={`http://localhost:5001/api/v1/storage/${imageName}`} alt='profile-pic'></img> : <img src={image} alt='profile-pic'></img>}</div>
            <label className="avatarBtn">CHANGE AVATAR <input
            type='file'
            accept=".png, .jpg, .jpeg, .svg"
            name='avatarImg'
            onChange={handlePhoto}
            />
            </label>
        </div>

        <form  className="form" onSubmit={handleSubmit}>
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
                <div className="btn"><button type="submit">Save</button></div>
                

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

)
}