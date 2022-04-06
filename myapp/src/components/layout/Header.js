function Header(props){
    return <header>
    <h1>
      <a href='/' onClick={(event)=>{ // event가 동작되면(여기서는 onClick!) react는 callback함수의 첫번째 parameter에 event 객체를 전달해준다. 이 event 객체는 event 상황과 정보를 제어할 수 있는 여러가지 기능을 가지고 있다.
        event.preventDefault(); // a tag의 기본 동작(reload) 방지
        props.onChangeMode();
      }}>{ props.title }</a>
    </h1>
  </header>
  }
export default Header;