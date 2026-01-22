Ext.onReady(function(){
    var winStudents = new Ext.window.Window({
        title:'Список мероприятий',
        titleAlign:'center',
        buttonAlign:'center',
        closable:false,
        constrain:true,
        width:1000,
        height:600,
        layout:'fit',
        items:[{
            xtype:'grid',
            store:{
                fields:['id','name','description','event_date','location','status'],
                autoLoad:true,
                proxy:{
                    url:'php/storeStudents.php',
                    type: 'ajax',
                }
            },
            columns:{
                items:[{
                    text:'ID',
                    dataIndex:'id',
                    flex:1,
                    hidden:true
                },{
                    text:'Название',
                    dataIndex:'name',
                    flex:2
                },{
                    text:'Описание',
                    dataIndex:'description',
                    flex:3
                },{
                    text:'Дата',
                    dataIndex:'event_date',
                    flex:1,
                    renderer: function(value) {
                        return value ? value.split('-').join('.') : '-';
                    }
                },{
                    text:'Место',
                    dataIndex:'location',
                    flex:2
                },{
                    text:'Статус',
                    dataIndex:'status',
                    renderer: function(value) {
                        if (value === 'scheduled') {
                            return '<div class="tagScheduled">Запланировано</div>';
                        } else if (value === 'completed') {
                            return '<div class="tagCompleted">Завершено</div>';
                        } else {
                            return '<div class="tagCancelled">Отменено</div>';
                        }
                    }
                }],
                defaults:{
                    align:'center',
                    flex:1
                }
            }
        }],
        buttons:[{
            text:'Добавить',
            height:32,
            style:'margin-right:20px',
            handler: function(){
                alert('Добавить мероприятие');
            }
        },{
            text:'Изменить',
            style:'margin-right:20px',
            height:32
        },{
            text:'Удалить',
            height:32
        }]
    });

    winStudents.show();
});
