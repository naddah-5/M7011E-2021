

export function login(username, password) {
    async () => {
        const res = await fetch("http://localhost:4000/graphql", {
            method: "POST",
            headers: {
            "Content-Type": "application/json"
            },
            body:JSON.stringify({
            query:`{
                login(
                email:"${username}",
                password:"${password}"
                ){
                token
                userId
                }}`
            })
        });
        let result = await res.json();
        return result.data.login;
    }
}