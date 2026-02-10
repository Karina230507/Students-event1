Ext.onReady(function(){
    
    // Главное окно с табами
    var mainWindow = new Ext.window.Window({
        title: 'Управление студенческими мероприятиями',
        titleAlign: 'center',
        closable: false,
        constrain: true,
        width: 1200,
        height: 700,
        layout: 'fit',
        
        items: [{
            xtype: 'tabpanel',
            activeTab: 0,
            
            items: [{
                // Вкладка со студентами
                title: '👨‍🎓 Студенты',
                layout: 'fit',
                
                items: [{
                    xtype: 'grid',
                    store: Ext.create('Ext.data.Store', {
                        fields: ['id_user','login','email','date_birth','gender','phone','role'],
                        proxy: {
                            type: 'ajax',
                            url: 'getUsers.php',
                            reader: {
                                type: 'json'
                            }
                        },
                        autoLoad: true
                    }),
                    
                    columns: [{
                        text: 'ID', dataIndex: 'id_user', width: 50
                    },{
                        text: 'Логин', dataIndex: 'login', width: 150
                    },{
                        text: 'Email', dataIndex: 'email', width: 200
                    },{
                        text: 'Дата рождения', dataIndex: 'date_birth', width: 100,
                        renderer: function(value){
                            return value ? value.split('-').reverse().join('.') : '';
                        }
                    },{
                        text: 'Пол', dataIndex: 'gender', width: 100
                    },{
                        text: 'Телефон', dataIndex: 'phone', width: 150
                    },{
                        text: 'Роль', dataIndex: 'role', width: 100
                    }],
                    
                    dockedItems: [{
                        xtype: 'toolbar',
                        dock: 'top',
                        items: [{
                            text: 'Добавить',
                            handler: function(){
                                showUserForm();
                            }
                        },{
                            text: 'Изменить',
                            handler: function(){
                                var grid = this.up('grid');
                                var selected = grid.getSelectionModel().getSelection();
                                if(selected.length > 0){
                                    showUserForm(selected[0]);
                                } else {
                                    Ext.Msg.alert('Внимание', 'Выберите пользователя для редактирования');
                                }
                            }
                        },{
                            text: 'Удалить',
                            handler: function(){
                                var grid = this.up('grid');
                                var selected = grid.getSelectionModel().getSelection();
                                if(selected.length > 0){
                                    Ext.Msg.confirm('Удаление', 'Удалить пользователя?', function(btn){
                                        if(btn == 'yes'){
                                            Ext.Ajax.request({
                                                url: 'deleteUser.php',
                                                method: 'POST',
                                                params: {
                                                    id_user: selected[0].get('id_user')
                                                },
                                                callback: function(options, success, response){
                                                    var result = Ext.decode(response.responseText);
                                                    if(result.success == 1){
                                                        grid.getStore().load();
                                                        Ext.toast('Пользователь удален', 3000);
                                                    } else {
                                                        Ext.Msg.alert('Ошибка', result.msg || 'Ошибка удаления');
                                                    }
                                                }
                                            });
                                        }
                                    });
                                } else {
                                    Ext.Msg.alert('Внимание', 'Выберите пользователя для удаления');
                                }
                            }
                        }]
                    }]
                }]
            },{
                // Вкладка с мероприятиями
                title: '🎯 Мероприятия',
                layout: 'fit',
                
                items: [{
                    xtype: 'grid',
                    store: Ext.create('Ext.data.Store', {
                        fields: ['id_event','event_name','description','event_date','event_time','location','organizer_id','max_participants','category','created_at'],
                        proxy: {
                            type: 'ajax',
                            url: 'getEvents.php',
                            reader: {
                                type: 'json'
                            }
                        },
                        autoLoad: true
                    }),
                    
                    columns: [{
                        text: 'ID', dataIndex: 'id_event', width: 50
                    },{
                        text: 'Название', dataIndex: 'event_name', width: 200
                    },{
                        text: 'Описание', dataIndex: 'description', flex: 1
                    },{
                        text: 'Дата', dataIndex: 'event_date', width: 100,
                        renderer: function(value){
                            return value ? value.split('-').reverse().join('.') : '';
                        }
                    },{
                        text: 'Время', dataIndex: 'event_time', width: 80
                    },{
                        text: 'Место', dataIndex: 'location', width: 150
                    },{
                        text: 'Категория', dataIndex: 'category', width: 120
                    },{
                        text: 'Макс. участников', dataIndex: 'max_participants', width: 100,
                        renderer: function(value){
                            return value || 'Не ограничено';
                        }
                    },{
                        text: 'Создано', dataIndex: 'created_at', width: 120,
                        renderer: function(value){
                            return value ? new Date(value).toLocaleDateString() : '';
                        }
                    }],
                    
                    dockedItems: [{
                        xtype: 'toolbar',
                        dock: 'top',
                        items: [{
                            text: 'Добавить',
                            handler: function(){
                                showEventForm();
                            }
                        },{
                            text: 'Изменить',
                            handler: function(){
                                var grid = this.up('grid');
                                var selected = grid.getSelectionModel().getSelection();
                                if(selected.length > 0){
                                    showEventForm(selected[0]);
                                } else {
                                    Ext.Msg.alert('Внимание', 'Выберите мероприятие для редактирования');
                                }
                            }
                        },{
                            text: 'Удалить',
                            handler: function(){
                                var grid = this.up('grid');
                                var selected = grid.getSelectionModel().getSelection();
                                if(selected.length > 0){
                                    Ext.Msg.confirm('Удаление', 'Удалить мероприятие?', function(btn){
                                        if(btn == 'yes'){
                                            Ext.Ajax.request({
                                                url: 'deleteEvent.php',
                                                method: 'POST',
                                                params: {
                                                    id_event: selected[0].get('id_event')
                                                },
                                                callback: function(options, success, response){
                                                    var result = Ext.decode(response.responseText);
                                                    if(result.success == 1){
                                                        grid.getStore().load();
                                                        Ext.toast('Мероприятие удалено', 3000);
                                                    } else {
                                                        Ext.Msg.alert('Ошибка', result.msg || 'Ошибка удаления');
                                                    }
                                                }
                                            });
                                        }
                                    });
                                } else {
                                    Ext.Msg.alert('Внимание', 'Выберите мероприятие для удаления');
                                }
                            }
                        }]
                    }]
                }]
            }]
        }]
    });
    
    mainWindow.show();
    
    // Функция формы для пользователя
    function showUserForm(record){
        var formWindow = new Ext.window.Window({
            title: record ? 'Изменить пользователя' : 'Добавить пользователя',
            modal: true,
            width: 400,
            height: 450,
            layout: 'fit',
            
            items: [{
                xtype: 'form',
                bodyPadding: 10,
                defaults: {
                    anchor: '100%',
                    labelWidth: 120
                },
                
                items: [{
                    xtype: 'textfield',
                    fieldLabel: 'Логин',
                    name: 'login',
                    allowBlank: false
                },{
                    xtype: 'textfield',
                    fieldLabel: 'Email',
                    name: 'email',
                    vtype: 'email',
                    allowBlank: false
                },{
                    xtype: 'datefield',
                    fieldLabel: 'Дата рождения',
                    name: 'date_birth',
                    format: 'd.m.Y',
                    value: new Date(),
                    allowBlank: false
                },{
                    xtype: 'combo',
                    fieldLabel: 'Пол',
                    name: 'gender',
                    store: ['male', 'female', 'other'],
                    editable: false,
                    displayField: 'name',
                    valueField: 'value'
                },{
                    xtype: 'textfield',
                    fieldLabel: 'Телефон',
                    name: 'phone'
                },{
                    xtype: 'combo',
                    fieldLabel: 'Роль',
                    name: 'role',
                    store: ['student', 'teacher', 'admin', 'organizer'],
                    editable: false,
                    value: 'student'
                }]
            }],
            
            buttons: [{
                text: 'Сохранить',
                handler: function(){
                    var form = this.up('window').down('form');
                    var values = form.getValues();
                    
                    // Форматируем дату для сервера
                    if(values.date_birth){
                        values.date_birth = Ext.Date.format(values.date_birth, 'd.m.Y');
                    }
                    
                    var url = record ? 'updateUser.php' : 'addUser.php';
                    
                    if(record){
                        values.id_user = record.get('id_user');
                    }
                    
                    Ext.Ajax.request({
                        url: url,
                        method: 'POST',
                        params: values,
                        callback: function(options, success, response){
                            var result = Ext.decode(response.responseText);
                            if(result.success == 1){
                                formWindow.close();
                                mainWindow.down('grid').getStore().load();
                                Ext.toast(record ? 'Пользователь обновлен' : 'Пользователь добавлен', 3000);
                            } else {
                                Ext.Msg.alert('Ошибка', result.msg || 'Ошибка сохранения');
                            }
                        }
                    });
                }
            },{
                text: 'Отмена',
                handler: function(){
                    this.up('window').close();
                }
            }]
        });
        
        // Заполняем форму если редактируем
        if(record){
            var date = record.get('date_birth');
            var gender = record.get('gender');
            var role = record.get('role');
            
            formWindow.down('form').getForm().setValues({
                login: record.get('login'),
                email: record.get('email'),
                date_birth: date ? new Date(date) : new Date(),
                gender: gender || 'other',
                phone: record.get('phone'),
                role: role || 'student'
            });
        }
        
        formWindow.show();
    }
    
    // Функция формы для мероприятия
    function showEventForm(record){
        // Сначала загружаем список организаторов (пользователей)
        var usersStore = Ext.create('Ext.data.Store', {
            fields: ['id_user', 'login'],
            proxy: {
                type: 'ajax',
                url: 'getUsers.php',
                reader: {
                    type: 'json'
                }
            },
            autoLoad: true
        });
        
        var formWindow = new Ext.window.Window({
            title: record ? 'Изменить мероприятие' : 'Добавить мероприятие',
            modal: true,
            width: 500,
            height: 500,
            layout: 'fit',
            
            items: [{
                xtype: 'form',
                bodyPadding: 10,
                defaults: {
                    anchor: '100%',
                    labelWidth: 150
                },
                
                items: [{
                    xtype: 'textfield',
                    fieldLabel: 'Название мероприятия',
                    name: 'event_name',
                    allowBlank: false
                },{
                    xtype: 'textarea',
                    fieldLabel: 'Описание',
                    name: 'description',
                    height: 80
                },{
                    xtype: 'datefield',
                    fieldLabel: 'Дата проведения',
                    name: 'event_date',
                    format: 'd.m.Y',
                    value: new Date(),
                    allowBlank: false
                },{
                    xtype: 'textfield',
                    fieldLabel: 'Время (чч:мм)',
                    name: 'event_time',
                    value: '18:00'
                },{
                    xtype: 'textfield',
                    fieldLabel: 'Место проведения',
                    name: 'location',
                    allowBlank: false
                },{
                    xtype: 'combo',
                    fieldLabel: 'Организатор',
                    name: 'organizer_id',
                    store: usersStore,
                    displayField: 'login',
                    valueField: 'id_user',
                    queryMode: 'local',
                    allowBlank: false,
                    forceSelection: true
                },{
                    xtype: 'numberfield',
                    fieldLabel: 'Макс. участников',
                    name: 'max_participants',
                    minValue: 1,
                    allowBlank: true
                },{
                    xtype: 'combo',
                    fieldLabel: 'Категория',
                    name: 'category',
                    store: ['lecture', 'workshop', 'sport', 'cultural', 'conference', 'other'],
                    editable: false,
                    value: 'other'
                }]
            }],
            
            buttons: [{
                text: 'Сохранить',
                handler: function(){
                    var form = this.up('window').down('form');
                    var values = form.getValues();
                    
                    // Форматируем дату для сервера
                    if(values.event_date){
                        values.event_date = Ext.Date.format(values.event_date, 'd.m.Y');
                    }
                    
                    var url = record ? 'updateEvent.php' : 'addEvent.php';
                    
                    if(record){
                        values.id_event = record.get('id_event');
                    }
                    
                    Ext.Ajax.request({
                        url: url,
                        method: 'POST',
                        params: values,
                        callback: function(options, success, response){
                            var result = Ext.decode(response.responseText);
                            if(result.success == 1){
                                formWindow.close();
                                mainWindow.down('tabpanel').down('grid[title="🎯 Мероприятия"]').getStore().load();
                                Ext.toast(record ? 'Мероприятие обновлено' : 'Мероприятие добавлено', 3000);
                            } else {
                                Ext.Msg.alert('Ошибка', result.msg || 'Ошибка сохранения');
                            }
                        }
                    });
                }
            },{
                text: 'Отмена',
                handler: function(){
                    this.up('window').close();
                }
            }]
        });
        
        // Заполняем форму если редактируем
        if(record){
            var date = record.get('event_date');
            var category = record.get('category');
            var organizer = record.get('organizer_id');
            
            formWindow.down('form').getForm().setValues({
                event_name: record.get('event_name'),
                description: record.get('description'),
                event_date: date ? new Date(date) : new Date(),
                event_time: record.get('event_time') || '18:00',
                location: record.get('location'),
                organizer_id: organizer,
                max_participants: record.get('max_participants'),
                category: category || 'other'
            });
        }
        
        formWindow.show();
    }
    
});