const fetchTodo = async () => {
    const res = await fetch('http://localhost:3000/')
    .then((res) => res.json())

    console.log(res);
    
    }

    fetchTodo()