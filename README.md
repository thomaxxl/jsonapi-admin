# jsonapi-admin

Interface configuration is declared in [src/Config.js] :

```javascript
const BaseUrl = 'http://thomaxxl.pythonanywhere.com'

const APP = {
    User: {
        'column': [
            {
                name: 'Name',
                api: 'name',
                type: 'text',
                placeholder: 'Type name.',
            },
            {
                name: 'Email',
                api: 'email',
                type: 'email',
                placeholder: 'Type email.',
            },
            {
                name: 'Comment',
                api: 'comment',
                type: 'textarea',
                placeholder: 'Type comment.',
            }],
        'actions': [CreateAction, EditAction, DeleteAction, AnalyzeAction],
        'path' : '/users',
        'API' : 'Users',
        'API_TYPE': 'User',
        'menu' : 'MyUsers',
        'Title' : 'My Users',
    },
    Books: {
        'column': [
            
            {
                name: 'This is Name',
                api: 'name',
                type: 'text',
                placeholder: 'Type name.',
            },
            {
                name: 'User_id',
                api: 'user_id',
                type: 'text',
                placeholder: 'Type user_id.',
            }],
        'actions': [CreateAction, EditAction, DeleteAction, AnalyzeAction],
        'API_TYPE': 'Book',
    }
}
```