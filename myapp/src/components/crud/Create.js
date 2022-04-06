//onSubmit -> form tag에서 submit을 클릭했을 때 발생하는 event!!
function Create(props){
    return <article>
      <h2>Create</h2>
      <form onSubmit={(event)=>{
        event.preventDefault(); //pagereload 막기
        const title = event.target.title.value; 
        const body = event.target.body.value;
        props.onCreate(title,body);
      }}> 
        <p><input type="text" name="title" placeholder="title"/></p>
        <p><textarea name="body" placeholder='body'></textarea></p>
        <input type="submit" value="Create"></input>
      </form>
    </article>
  }

export default Create;
