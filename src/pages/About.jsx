import React from 'react'
import { Link }  from 'react-router-dom';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden'


import profile from '../Images/profile.svg';
import friends from '../Images/find-friends.svg';
import favorites from '../Images/favorites.svg';
import social from '../Images/social-network.svg';
export default function About(props) {
 return(
<>  
      
      <main className = 'about-main'>
        
      <div className="hero">
          <Container>
        <Grid container spacing={3}>

        <Grid item xs={12}>
        <h2>Welcome to Bible With Friends</h2>
        <p>Bible With Friends is a brand-new social media platform that allows you to network with fellow believers across the world.
          Experience the word in a new way, together. Get started in four easy steps.
        </p>
        </Grid>

        </Grid>
        </Container>
        </div>
<Hidden mdUp>

        <h2>Step one: Create a Profile</h2>
        <p>
          Get started on our homepage I sang in with either your email or through Google. After signing up you will be prompted to pick a profile icon or given the option to use your existing Google photo.
        </p>

        <img src={profile} className = 'backgroundimg img-right' alt="" />
        




        <h2>Step two: Find your Friends</h2>
        <p>Use our search tool or ask your friend to send you a direct through their profile link. Upon visiting their profile, you can use The follow button to add them to your follows list.</p>
        <img src={friends} className = 'backgroundimg img-left' alt="" />

        <h2>Step three: Create a Favorites List</h2>
        <p>
          The favorites list is a group of people that will be shown when you are readiing the Bible. You can edit this list at any time in order to see what your friends have to say.
        </p>

        <img src={favorites} className = 'backgroundimg img-right' alt="" />
        



        <h2>Step four: Read and Comment</h2>
        <p>
          Click the Bible tab to begin reading the word. While reading you can leave comments on the side pertaining to certain verses. People who follow you will see these comments and they are able to respond.
        </p>
        <img src={social} className = 'backgroundimg img-left' alt="" />
        
</Hidden>
<Hidden smDown>
        <section className = 'first-section'>
          <Container>
        <Grid container spacing={3}>

        <Grid item md={7} sm={12}>
        <h2>Step one: Create a Profile</h2>
        <p>
          Get started on our homepage I sang in with either your email or through Google. After signing up you will be prompted to pick a profile icon or given the option to use your existing Google photo.
        </p>
        </Grid>
        <Grid item md={5} sm={12}>
        <img src={profile} className = 'backgroundimg img-right' alt="" />
        
        </Grid>

        </Grid>
        </Container>
        


          <Container>
        <Grid container spacing={3}>

        <Grid item md={5} sm={12}>
        <img src={friends} className = 'backgroundimg img-left' alt="" />
        
        </Grid>
        <Grid item md={7} sm={12}>
        <h2>Step two: Find your Friends</h2>
        <p>Use our search tool or ask your friend to send you a direct through their profile link. Upon visiting their profile, you can use The follow button to add them to your follows list.</p>
        </Grid>
      
        </Grid>
        </Container>
        </section>
          <section className = 'second-section'>
          <Container>
        <Grid container spacing={3}>
        
        <Grid item md={7} sm={12}>
        <h2>Step three: Create a Favorites List</h2>
        <p>
          The favorites list is a group of people that will be shown when you are readiing the Bible. You can edit this list at any time in order to see what your friends have to say.
        </p>
        </Grid>
        <Grid item md={5} sm={12}>
        <img src={favorites} className = 'backgroundimg img-right' alt="" />
        
        </Grid>
        </Grid>
        </Container>
        
        <Container>
        <Grid container spacing={3}>
        <Grid item md={5} xs={12}>
        <img src={social} className = 'backgroundimg img-left' alt="" />
        
        </Grid>
        <Grid item md={7} sm={12}>
        <h2>Step four: Read and Comment</h2>
        <p>
          Click the Bible tab to begin reading the word. While reading you can leave comments on the side pertaining to certain verses. People who follow you will see these comments and they are able to respond.
        </p>
        </Grid>
    
        </Grid>
        </Container>
        </section>
        
        </Hidden>

      </main>
      <footer>
      <Container>
        <div className='white'>
        BiblewithFriends&copy;
        </div>
        <div>
          <ul>
            <li><Link className='white' to='/'>Login</Link></li>
            <li><Link className='white' to='/about'>About</Link></li>
          </ul>
        </div>
      </Container>        
      </footer>        
      
      </>
    );
}
