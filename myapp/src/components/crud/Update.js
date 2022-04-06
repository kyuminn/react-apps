import {useState} from 'react';

// Update Component 구현
function Update(props){
    const [title,setTitle] = useState(props.title); // input tag 에서 값 수정할 수 있게 props(어명 느낌.변화ㄴㄴ) 를 state 로 갈아타게 하는 것.
    const [body,setBody] = useState(props.body);
    return <article>
    <h2>Update</h2>
    <form onSubmit={(event)=>{
      event.preventDefault(); //pagereload 막기
      const title = event.target.title.value; 
      const body = event.target.body.value;
      props.onUpdate(title,body);
    }}> 
      <p><input type="text" name="title" value={title} placeholder="title" onChange={(event)=>{
        console.log(event.target.value);  //javascript의 onchange와 다르게 , react의 onchange는 값이 바뀔 때 마다 호출된다!
        setTitle(event.target.value);
      }}/></p>
      <p><textarea name="body" placeholder='body' value={body} onChange={(event)=>{
        setBody(event.target.value);
      }}></textarea></p>
      <input type="submit" value="Update"></input>
    </form>
  </article>
  }

export default Update;