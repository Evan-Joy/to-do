import { Checkbox, Collapse, Divider, Input, Modal } from 'antd';
import React, { useEffect, useState } from 'react';
import { Apis, Funcs, UI } from '../utils';
import { DeleteOutlined } from '@ant-design/icons';

const HomePage: React.FC = () => {
  //declare task hook to call api insert task into db
  const [task, setTask] = useState<string>('');
  //declare finish hook to call api to get finish task
  const [finish, setFinish] = useState<any[]>([]);
  //declare todo hook to call api to get list to do task.
  const [todo, setTodo] = useState<any[]>([]);

  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState<boolean>(false);
  //declare any type to take v shouldn't use string bc take task  only 
  const [getTask, setGetTask] = useState<any>({});

  //handle load to do task
  useEffect(() => {
    loadAllTodo(false);
    loadAllTodo(true);
  }, []);
  const loadAllTodo = async (isDone: boolean) => {
    let uri = Apis.API_HOST + Apis.API_TAILER.TODO.ROOT;

    if (isDone) {
      uri += `?isDone=true`;
    } else {
      uri += `?isDone=false`;
    }
    const dataRes = await Funcs.fun_get(uri);

    if (!dataRes.success) {
      UI.toastError(dataRes.message);
      return;
    }
    if (isDone) {
      setFinish(dataRes.result);
    } else
      setTodo(dataRes.result);

  }
  //handle key down reload to do task
  const handleKeydown = async () => {
    const dataRes = await Funcs.fun_post(Apis.API_HOST + Apis.API_TAILER.TODO.ROOT, {
      'task': task,
    });
    if (!dataRes.success) {
      UI.toastError(dataRes.message);
      return;
    }
    UI.toastSuccess("Add 1 new task successfully!");
    setTask("");
    loadAllTodo(false);
  }
  //handle update isDone true false
  const handleUpdateIsDoneWithValue = async (idRecord: number, isDone: boolean) => {
    console.log(`Updating record id: [${idRecord}]=> isDone [${isDone}]`);
    //declare uri for each true or false value
    let uri = Apis.API_HOST + Apis.API_TAILER.TODO.ROOT;
    if (isDone) {
      uri += `/${idRecord}?isDone=true`;
    } else {
      uri += `/${idRecord}?isDone=false`;
    }
    // call api to update for each true false value
    const dataRes = await Funcs.fun_put(uri);
    //if call false make notification exit func
    if (!dataRes.success) {
      UI.toastError(dataRes.message);
      return;
    }
    //if call successfully toast success 
    UI.toastSuccess("Update successfully!");
    //reload to do list
    loadAllTodo(false);
    //reload finish list
    loadAllTodo(true);
  }
  //handle delete 
  const handleDelete = async (idRecord: number) => {
    //make variable which call api
    const dataRes = await Funcs.fun_delete(Apis.API_HOST + Apis.API_TAILER.TODO.ROOT + `/${idRecord}`);
    //if false 
    if (!dataRes.success) {
      UI.toastError(dataRes.message);
      return;
    } else {
      UI.toastSuccess("Delete 1 task successfully!");
      loadAllTodo(false);
    }
  }
  const handleUpdateOk = async () => {
    const dataRes = await Funcs.fun_put(Apis.API_HOST + Apis.API_TAILER.TODO.UPDATE_TODO + `/${getTask.id}`, {
      'task': getTask.task,
    })
    if (!dataRes.success) {
      UI.toastError(dataRes.message);
      return;
    }
    UI.toastSuccess("Update 1 task successfully!")
    loadAllTodo(false);
    setIsModalUpdateOpen(false);
  }
  const handleUpdateCancel = () => {
    setIsModalUpdateOpen(false);
  }
  //render UI
  //handle logic.
  return (
    <div className='container'>
      <Input value={task} onChange={(e) => setTask(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") { handleKeydown() } }} placeholder='Nhap ten task +Enter' ></Input>
      <div className="container-box">
        <div className="task-show">
          <Collapse defaultActiveKey={['1']}>
            <Collapse.Panel header="DANH SÁCH VIỆC CẦN LÀM" key="1">
              <Modal title="Wanna update task?" visible={isModalUpdateOpen} onOk={handleUpdateOk} onCancel={() => handleUpdateCancel()}>
                <input onChange={(e) => setGetTask({ ...getTask, task: e.target.value })} value={getTask.task} className='form-control' placeholder='input task you want to edit' type="text" />

              </Modal>
              {todo.map((v, k) => {
                return (
                  <div key={k}>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between'
                    }}>
                      <div style={{
                        width: '98%',
                      }}>
                        <div style={{
                          display: 'flex'
                        }}>
                          <div style={{
                            width: '2%',
                          }}><Checkbox checked={false} onChange={(e) => handleUpdateIsDoneWithValue(v.id, true)}></Checkbox>&nbsp;</div>
                          <div className='pointer' onClick={() => {
                            setIsModalUpdateOpen(true)
                            setGetTask(v);
                          }} style={{
                            width: '98%',
                          }}><span>{v.task}</span></div>
                        </div>
                      </div>
                      <div className='pointer' onClick={(e) => handleDelete(v.id)}><DeleteOutlined /></div>
                    </div>
                    <Divider className='custom-divider'></Divider>
                  </div>
                )
              })

              }
            </Collapse.Panel>
          </Collapse>
        </div>
        <div className="task-complete">
          <Collapse defaultActiveKey={['1']}>
            <Collapse.Panel header="HOÀN THÀNH" key="1">
              {finish.map((v, k) => {
                return (
                  <div key={k}>
                    <div>
                      <div className='trikethrough'><Checkbox checked={false} onChange={(e) => handleUpdateIsDoneWithValue(v.id, false)}></Checkbox>{v.task}</div>
                    </div>
                    <Divider className='custom-divider'></Divider>
                  </div>
                )
              })
              }
            </Collapse.Panel>
          </Collapse>
        </div>
      </div>
    </div>
  );
};

export default React.memo(HomePage);