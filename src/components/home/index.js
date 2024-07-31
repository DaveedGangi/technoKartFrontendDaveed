

import { Component } from 'react'

import Offcanvas from 'react-bootstrap/Offcanvas';

import { IoMenuOutline } from "react-icons/io5";

import { GoSearch } from "react-icons/go";

import { FaImage } from "react-icons/fa";


import {  RiDraftFill} from "react-icons/ri";

import { MdPublishedWithChanges } from "react-icons/md";




import { PiNotePencilBold } from "react-icons/pi";



import Cookies from "js-cookie";

import {Redirect,Link} from "react-router-dom"

import "./index.css"

class Home extends Component {

    state={unApprovedComments:[],approvedComments:[],allComments:[],comment:"",editId:"",editPost:false,editAuthor:"",editStatus:"", editTitle:"",editDescription:"",editImageUrl:"",user:[],imageFile:"",searchInput:"",show:false,addNote:false,allItems:true,draft:false,publish:false,allPosts:[],draftPostsData:[],title:"",content:""}


    componentDidMount(){
        this.fetchAllPosts()
        this.fetchAllComments()
        const user = JSON.parse(localStorage.getItem('user'));
        if(user){
            this.setState({user:user})
        }
   

        
    }

    fetchAllComments=async()=>{
        const response=await fetch("https://technokartbackenddaveed.onrender.com/allComments/")
        if(response.ok){
            console.log("Comments fetched successfully")
            const data=await response.json()

            const filteredUnapprovedComments=data.filter((each)=>each.approved===0)
            const filteredApprovedComments=data.filter((each)=>each.approved===1);
            this.setState({allComments:data,unApprovedComments:filteredUnapprovedComments,approvedComments:filteredApprovedComments})
        }else{
            console.log("Error fetching comments")
        }
    }









    fetchAllPosts=async()=>{
        const response=await fetch("https://technokartbackenddaveed.onrender.com/allPosts/")
       
        if(response.ok){
            console.log("Posts fetched successfully")
            const data=await response.json()
            const {searchInput}=this.state
            console.log("data",data)

            const filteredPublishedData=data.filter((eachItem)=>eachItem.STATUS==="published")

            const filteredDraftData=data.filter((eachItem)=>eachItem.STATUS==="draft")
            
            const filteredSearchData=filteredPublishedData.filter((eachItem)=>eachItem.title.toLowerCase().includes(searchInput.toLowerCase()))

        this.setState({allPosts:filteredSearchData,draftPostsData:filteredDraftData});
        }else{
            console.log("Error fetching posts")
        }
    }

    handleShow = () => {
        this.setState({show: true});
    }

    handleClose = () => {
        this.setState({show: false});
    }

    addItem=()=>{
        this.setState({addNote:true})
        this.setState({allItems:false})
        this.setState({publish:false})
        this.setState({draft:false})
    }
    
    allItemsShow=()=>{
        this.setState({addNote:false})
        this.setState({draft:false})
        this.setState({publish:false})
        this.setState({allItems:true})
    }

    draftItems=()=>{
        this.setState({addNote:false})
        this.setState({allItems:false})
        this.setState({publish:false})
        this.setState({draft:true})
    }

    publishedItems=()=>{
        this.setState({addNote:false})
        this.setState({allItems:false})
        this.setState({draft:false})
        this.setState({publish:true})
    }


    addingNewPost=async()=>{
       
        const {title,content,imageFile,user}=this.state
        const {id}=user
        const data={
            title:title,
            content:content,
            image:imageFile,
            author_id:id,
            status:"published"
        }
        const options={
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                Accept:"application/json"
            },
            body:JSON.stringify(data)
        }
        const response=await fetch("https://technokartbackenddaveed.onrender.com/postsAdd/",options)
        if(response){
        console.log("Post added successfully")
        
        this.setState({title:"",content:"",imageFile:"",addNote:false,allItems:true},()=>{
            this.fetchAllPosts()
            
        })

        }else{
            console.log("error")
        }
    }




    titleInput=(event)=>{
        this.setState({title:event.target.value})
    }
    textareaInput=(event)=>{
        this.setState({content:event.target.value})
    }
    imageFileInput=(event)=>{
        this.setState({imageFile:event.target.value})
    }


    


  

    userInputSearch=(event)=>{
        this.setState({searchInput:event.target.value})
        console.log(event.target.value)
        if(event.target.value.length===0){
            this.fetchAllPosts()
        }
        this.fetchAllPosts();
    }

    searchButton=()=>{
        this.fetchAllPosts()
    }


    deleteItem=async(item)=>{
        const {id}=item
        const response=await fetch(`https://technokartbackenddaveed.onrender.com/postDelete/${id}`,{
            method:"DELETE",
            headers:{
                "Content-Type":"application/json",
                Accept:"application/json"
            }
        })
        if(response.ok){
            console.log("Post deleted successfully")
            this.setState({allItems:true},()=>{
                this.fetchAllPosts()
            })
        }else{
            console.log("Error deleting post")
        }



    }

    draftItem=async(item)=>{
        const {id}=item
        const data={
            title:item.title,
            content:item.content,
            image:item.image,
            author_id:item.author_id,
            status:"draft"
        }
        const response=await fetch(`https://technokartbackenddaveed.onrender.com/postUpdate/${id}`,{
            method:"PUT",
            headers:{
                "Content-Type":"application/json",
                Accept:"application/json"
            },
            body:JSON.stringify(data)
        })
        if(response.ok){
            console.log("Post drafted successfully")
            this.setState({allItems:true},()=>{
                this.fetchAllPosts()
            })
        }else{
            console.log("Error drafting post")
        }


    }


    publishPost=async(item)=>{
        const {id}=item
        const data={
            title:item.title,
            content:item.content,
            image:item.image,
            author_id:item.author_id,
            status:"published"
        }
        const response=await fetch(`https://technokartbackenddaveed.onrender.com/postUpdate/${id}`,{
            method:"PUT",
            headers:{
                "Content-Type":"application/json",
                Accept:"application/json"
            },
            body:JSON.stringify(data)
        })
        if(response.ok){
            console.log("Post drafted successfully")
            this.setState({draft:true},()=>{
                this.fetchAllPosts()
            })
        }else{
            console.log("Error drafting post")
        }





    }


    updatePost=async(id)=>{

        const {editAuthor,editTitle,editContent,editImage,editStatus}=this.state
        const data={
            title:editTitle,
            content:editContent,
            image:editImage,
            author_id:editAuthor,
            status:editStatus
        }
        console.log(data);
        console.log("id edit post",id);

        const response=await fetch(`https://technokartbackenddaveed.onrender.com/postUpdate/${id}`,{
            method:"PUT",
            headers:{
                "Content-Type":"application/json",
                Accept:"application/json"
            },
            body:JSON.stringify(data)
        })
        if(response.ok){
            console.log("Post edited successfully")
            this.setState({allItems:true},()=>{
                this.fetchAllPosts();
                this.cancelEdit();
            })
        }else{
            console.log("Error Edit post")
        }



    }

    editPostItem=(item)=>{
        console.log("edit",item)
        this.setState({editId:item.id,editPost:true,editTitle:item.title,editContent:item.content,editImage:item.image,editAuthor:item.author_id,editStatus:item.STATUS})
    }

    cancelEdit=()=>{
        console.log("cancel")
        this.setState({editId:"",editTitle:"",editContent:"",editImage:"",editAuthor:"",editStatus:"",editPost:false})
    
    
    }


  editTitlePost=(event)=>{
        this.setState({editTitle:event.target.value})
  }
  editContentPost=(event)=>{
    this.setState({editContent:event.target.value})
  }
  editImagePost=(event)=>{
    this.setState({editImage:event.target.value})
  }
    
  comment=(event)=>{

    this.setState({comment:event.target.value})
  }

  commentPost=async(post)=>{
    const{comment}=this.state;
    console.log("post",post);
    const url="https://technokartbackenddaveed.onrender.com/commentsAdd/"

    const data={
        post_id:post.id,
        author_id:post.author_id,
        content:comment
    }
    const response=await fetch(url,{
        method:"POST",
        headers:{
            "Content-Type":"application/json",
            Accept:"application/json"
        },
        body:JSON.stringify(data)
    })
    if(response.ok){
        console.log("Comment added successfully")
        this.setState({allItems:true},()=>{
            this.fetchAllPosts();
            this.fetchAllComments();
            this.setState({comment:""})
        })
    }else{
        console.log("Error adding comment")
    }
    
  }

approveComment=async(id)=>{
    const url=`https://technokartbackenddaveed.onrender.com/commentApprove/${id}`
    const response=await fetch(url,{
        method:"PUT",
        headers:{
            "Content-Type":"application/json",
            Accept:"application/json"
        }
    })
    if(response.ok){
        console.log("Comment approved successfully")
        this.setState({allItems:true},()=>{
            this.fetchAllPosts();
            this.fetchAllComments();
        })
    }else{
        console.log("Error approving comment")
    }


}


deleteComment=async(id)=>{
    const url=`https://technokartbackenddaveed.onrender.com/commentDelete/${id}`
    const response=await fetch(url,{
        method:"DELETE",
        headers:{
            "Content-Type":"application/json",
            Accept:"application/json"
        }
    })
    if(response.ok){
        console.log("Comment deleted successfully")
        this.setState({allItems:true},()=>{
            this.fetchAllPosts();
            this.fetchAllComments();
        })
    }else{
        console.log("Error deleting comment")
    }

}

    render(){
        const {approvedComments,unApprovedComments,allComments,comment,editId,editTitle,editContent,editImage,editPost,user,imageFile,searchInput,show,allItems,addNote,allPosts,title,content,draft,draftPostsData} = this.state
        console.log("user",user);
        const role=user.role
        console.log(role);
       console.log("editPost",editPost);
       console.log("allComments",allComments)
        const jwtToken=Cookies.get("jwtToken")
        if(jwtToken===undefined){
            return(
                <Redirect to="/login" />
            )
        }
        return(
            <div>

                <div className="nav-bar">
                <div>
                <button type="button"  className="hamburg-menu" onClick={this.handleShow}>
                <IoMenuOutline /> 
                </button>

      <Offcanvas show={show} onHide={this.handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
          <div className='show-only-on-larger-screen'>
                <img className='keep-logo' src="https://i.ibb.co/2gJMqph/9lpk2ygp.png" alt="blog-logo-not-found"/>
                <span className="keep-title">Blog</span>
                

               </div>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
                <div>
                    <h3>Welcome to Blog</h3>
                   <p>create a beautifull posts</p>
                   <p></p>
                    
                    
                </div>
                <div className='notes-add-button-container'>
                    <div className='icon'>
                    <FaImage size={25} />
                    </div>
                    <div className='button'>
                    <button onClick={this.allItemsShow} className="notes-all-add-button">Posts</button>
                    </div>
                  
                </div>

                {(role==="admin" || role==="author")&&
                <div className='notes-add-button-container'>
                 
                    <div className='icon'>
                    <PiNotePencilBold  size={25} />
                    </div>
                    <div className='button'>
                    <button onClick={this.addItem} className="notes-all-add-button">Add a Post</button>
                    </div>
                  
                  
                </div>
                 }


                <div className='notes-add-button-container'>
                    <div className='icon'>
                    <RiDraftFill  size={25} />
                    </div>
                    <div className='button'>
                    <button onClick={this.draftItems} className="notes-all-add-button">Draft</button>
                    </div>
                  
                </div>
                <div className='notes-add-button-container'>
                    <div className='icon'>
                    <MdPublishedWithChanges size={25} />
                    </div>
                    <div className='button'>
                    <button onClick={this.publishedItems} className="notes-all-add-button">published</button>
                    </div>
                  
                </div>
        </Offcanvas.Body>
      </Offcanvas>
                </div>

              

                <div className='search-bar-container'>
                    <button onClick={this.searchButton} className="search-button"><GoSearch /></button>
                    <input value={searchInput} onChange={this.userInputSearch}  type="search" placeholder="Search" className="search-bar" />
                </div>
              

                <div>
                    <Link to ="/profile">
                    <img src="https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?w=740&t=st=1721325896~exp=1721326496~hmac=9b0e0ed6d5328d0f0ad3f74f17048bdca4736e9f69a0d125db1f586a93cb79f9" alt="image-user-not-found" className="user-image" />
                    </Link>
                </div>

                </div>


                <div>
                    {
                        role==="admin" &&
                        <div>
                            {
                                unApprovedComments.map((each)=><div className="approve-card" key={each.id}>
                                    <h3>Admin</h3>
                                    <p>comment: {each.content}</p>
                                    <p>post id: {each.post_id}</p>
                                    <button onClick={()=>this.approveComment(each.id)} className="btn btn-outline-primary">Approve</button>
                                    </div>)
                            }

                        </div>
                    }
                </div>



                <div className="container-for-items">
                    

                    <div className={addNote?"note-add-container":"hide-note-add-container"}>
                        <h2>Adding Posts</h2>
                        <p>Write down your thoughts or ideas. They'll show up here.</p>
                        
                        <div className="item-container">

                        <div className="item">
                            <input onChange={this.titleInput} value={title}  type="text" placeholder='Title' />
                        </div>
                        <div className="item">
                            <textarea  onChange={this.textareaInput} value={content} className="textArea" type="textArea" placeholder='Description' />
                        </div>
                        <div>
                            <input  onChange={this.imageFileInput} value={imageFile} placeholder='Image URL'  type="url"/>
                        </div>
                     
                        <div>
                            <button onClick={this.addingNewPost} type="button" className="btn btn-primary"> Add  </button>
                        </div>

                        </div>
                    </div>


                    <div className={draft?"draft-all-items":"hide-draft-all-items"}>

                      <div>
                        {draftPostsData.length===0? <div>
                           
                            <h3>Drafts are empty</h3>
                            <p>Once you draft a post, it'll appear here.</p>
                            <img className="empty-note-image" src="https://img.freepik.com/free-vector/hand-drawn-no-data-concept_52683-127818.jpg?t=st=1722348886~exp=1722352486~hmac=443ae35998ebfc59eeabd61721c2ab9741073276b54fdee5d9b67c96521d5c34&w=900" alt="empty-note-image"/>
                     </div>: 
                     <div> 

                        {
                            draftPostsData.map((each)=><div key={each.id}>
                                <div>
                                    <img src={each.image} alt="image-not-found" className="item-image" />
                                </div>
                                <h3>{each.title}</h3>
                                <p>{each.content}</p>

                                <div>
                                    <button type="button" className="btn btn-primary" onClick={()=>this.publishPost(each)}>Publish</button>
                                </div>
                                </div>)
                        }
                     </div>
                     
                         }
                         </div>
                         
                    </div>


                    <div className={allItems?"notes-all-items":"hide-notes-all-items"}>
                       
                       {allPosts.length===0? <div>
                           <h3>Posts are empty</h3>
                           <p>Start adding posts by clicking the 'Add a Post' button above.</p>
                           <img className="empty-note-image" src="https://img.freepik.com/free-vector/characters-people-holding-website-icons-illustration_53876-35213.jpg?t=st=1722343498~exp=1722347098~hmac=0dde978cfa73b4ddc10bc0c41b44b4a02e936009c1ca97cffa85c7fdfc7db800&w=740" alt="empty-note-image"/>
                       </div>
                       :
                       <div className="container-for-all-items">

                        {
                            editPost===true?
                            <div className="editCard-post-container">
                                <p>Edit Available</p>
                                <input onChange={this.editTitlePost} type="text" value={editTitle}/>
                            
                                <textarea onChange={this.editContentPost} type="text" value={editContent}/>
                           
                                <input onChange={this.editImagePost} type="url" value={editImage}/>
                           
                                  <br/>
                                  <br/>
                                <button type="button" className="btn btn-primary" onClick={()=>this.updatePost(editId)}>Update</button>
                               
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <button type="button" className="btn btn-danger" onClick={this.cancelEdit}>Cancel</button>
                              
                            </div>:null
                        }
                        
                    <div className="list-of-all-items">
                       {allPosts.map((post)=>{
                        let filteredEachRelatedComment=approvedComments.filter((comment)=>comment.post_id===post.id)
                                    
                       
                     return(

                           <div key={post.id} className="itemCard-for-showing-items">
                               <div>
                                <img  src={post.image} alt="image-not-found" className="item-image" />
                                </div>
                               <div>
                                   <h3>{post.title}</h3>
                                   <p>{post.content}</p>
                                 
                                   <p>Status: {post.STATUS}</p>
                                   <p>Created:{post.created_at}</p>
                                   
                                   <div className="edit-draft-delete-buttons">
                                       <div>
                                           <button onClick={()=>this.editPostItem(post)} type="button" className="btn btn-primary"> Edit  </button>
                                       </div>
                                       <div>
                                           <button onClick={()=>this.draftItem(post)} type="button" className="btn btn-secondary"> Draft  </button>
                                       </div>

                                       <div>
                                           <button onClick={()=>this.deleteItem(post)} type="button" className="btn btn-danger"> Delete  </button>
                                       </div>



                                   </div>

                               </div>


                        {(role==="reader" || role==="admin")&&
                                <div>
                                    <p>Do you want to comment</p>

                                    <div>
                                      
                                            <div>
                                                <h4>Approved Comments</h4>
                                                {filteredEachRelatedComment.length === 0 ? (
                                                    <p>No approved comments yet.</p>
                                                ) : (
                                                    filteredEachRelatedComment.map((comment) => (
                                                        <div key={comment.id}>
                                                            <p>{comment.content}</p>
                                                             
                                                            <button onClick={() => this.deleteComment(comment.id)} className="btn btn-danger delete-button">Delete</button>
                                                        </div>
                                                    ))
                                                )}
                                            </div> 
                                    
                                    </div>
                                    <input placeholder='Comment here...' type="text" onChange={this.comment} value={comment}/>
                                    <div>
                                        <br/>
                                        <button type="button" className="btn btn-primary" onClick={()=>this.commentPost(post)}>Add a Comment</button>
                                    </div>
                                </div>


                        }




                           </div>
                       )
                    }
                    
                    )
                       }
                   </div>

                       </div>
                       
                       
                       
                       
                       }

                      
                   </div>


                         
                </div>
                     
                    
                     
        
                    
            



                    
                


           
              

               
               
               
               
               
                <link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
  integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN"
  crossOrigin="anonymous"
/>
            </div>
        )
    }

}



export default Home;