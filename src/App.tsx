import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [images, setImages] = useState([]);
  const [name, setName] = useState(''); // Added state for name
  const [comment, setComment] = useState(''); // Added state for comment
  const [submittedComment, setSubmittedComment] = useState(''); // Added state for displaying submitted comment
  const [SubmittedName, setSubmittedName] = useState('');

  useEffect(() => {

    const getImages = async () => {
      try {
        const response = await axios.get(
          "https://api.unsplash.com/search/photos?per_page=100&query=Adult%20girl&client_id=HP1nqhpQupb7hstBROd_AhPuQoNJsqRAOhAxS_NOySw" // Replace with your Unsplash API client ID
        ); // Consider using a process variable for the client ID
        const data = response.data.results;
        setImages(data.map((image: { urls: { regular: any; }; }) => image.urls?.regular)); // Extracting regular URL from each image
      } catch (error) {
        console.error("Error occurred", error);
      }
    };

    getImages();
  }, []); // Empty dependency array ensures useEffect runs only once after the component mounts

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handleNameChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setName(event.target.value); // Update name state based on user input
  };

  const handleCommentChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setComment(event.target.value); // Update comment state based on user input
  };

  const handleSubmitComment = () => {
    console.log('Name:', name);
    console.log('Comment:', comment);
    // You can implement functionality to submit the comment to a server here (optional)
    setSubmittedName(`${name}`); // Update submitted comment for display
    setSubmittedComment(`${comment}`); // Update submitted comment for display
    // Clear name and comment after submission (optional)
    // setName('');
    // setComment('');
  };

  return (
    <>
    <div className='no-scroll-wrapper'>
      <div>
        <h1 className="font-semibold font-sans hover:text-4xl text-3xl text-center py-10">
          Not So Vulnerable App
        </h1>
      </div>
      <div >
        
        <div className="flex flex-col items-center">
          <div className="w-2/5 mx-auto">
            <img
              src={images[currentImageIndex]}
              alt={`Image ${currentImageIndex + 1}`}
              className="cursor-all-scroll"
            />
            <button onClick={handleNextImage} className="bg-black px-2 py-1 rounded-lg my-5 cursor-pointer">
              Next Image
            </button>
          </div>

          {/* Name and Comment Section - Centered in a column */}
          <div className="flex flex-col items-center my-1">
            <div className="mr-1">
              <h3>Name</h3>
              <input
                className="my-2 bg-white text-black border border-gray-300 p-2 rounded-md cursor-text"
                type="text"
                id="name_taker"
                name="name_taker"
                value={name} // Set initial value from state
                onChange={handleNameChange} // Update state on change
              />
            </div>
            <div className="">
              <h3>Comment</h3>
              <textarea
                className="my-2 bg-white text-black border border-gray-300 p-2 rounded-md cursor-text"
                id="comment"
                name="comment"
                value={comment} // Set initial value from state
                onChange={handleCommentChange} // Update state on change
              />
            </div></div></div>
            <div className='flex flex-col items-center'>
         <button onClick={handleSubmitComment} className="bg-black px-2 py-1 rounded-lg my-2 cursor-pointer">
              Exploit
            </button>
            </div>
        {submittedComment && ( // Conditionally render submitted comment
          <div className='flex flex-col items-center'>
            <p className='text-2xl '>Submitted Comment</p><br/>  
            <p>Name : {SubmittedName}</p>
            <p>Comment : {submittedComment}</p>
          </div>
        )}
      </div>
      <br/><br/>
      </div>
      <footer className="copyright no-scroll flex justify-center py-1" >
    <p>&copy; copyright 2024 [ SSS ]</p>
  </footer>
    </>
  );
}

export default App;
