function Nav(props){
    const lis =[];
    for(let i =0 ; i<props.topics.length; i++){
      let t = props.topics[i];
      lis.push(<li key={t.id}>
          <a id={t.id} href={'/read/'+t.id} onClick={(event)=>{ // id 값에 {t.id}를 주고 나서 onChangeMode에 parameter 줄 때 이용. 주의 ) 숫자를 id값에 주면 문자열로 파싱되므로, 숫자로 변환해줘야함
            event.preventDefault();
            props.onChangeMode(Number(event.target.id));  //event.target은 event를 유발시킨 tag를 가리킨다 , 여기서는 a tag를 의미함. 
          }}>{t.title}</a>
        </li>)
    }
    return (<nav>
      <ol>
        {lis}
      </ol>
    </nav>
    )};

export default Nav;