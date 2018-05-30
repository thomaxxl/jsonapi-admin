//This is to ensure that we can see the entirety of the store

export default {
    modalReducer:{
        showmodal:false
    }, 
    formReducer:{
        form:true
    },
    analyzeReducer:{
        showmodal:false
    },

    UsersReducer: {
        datas: []
    },
    selectedUserReducer: {
        data: {
            id:'',
            Name:'',
            Comment:'',
            Number:'',
            Email:'',
        }
    },
    BooksReducer: {
        datas: []
    },
    selectedBookReducer: {
        data: {
            id:'',
            Name:'',
            User_id:'',
        }
    },
};
