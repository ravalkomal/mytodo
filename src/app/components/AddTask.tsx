'use client'
import { FaPlus } from "react-icons/fa";
import { Modal } from "./Modal";
import {FormEventHandler, useState} from "react";
import { addTodo } from "../../../api";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from 'uuid';

export const AddTask = () => {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [newTaskValue, setNewTaskValue] = useState<string>('')

  const handleSubmitNewTodo: FormEventHandler<HTMLFormElement> = async (e) =>{
    e.preventDefault();
    await addTodo({
      id: uuidv4(),
      text:newTaskValue
    })
    setNewTaskValue("");
    setModalOpen(false);
    router.refresh();

  }

  return (
    <div>
        <button onClick={() => setModalOpen(true)} className="btn btn-primary w-full">Add New Task <FaPlus className="ml-2" size={11} /></button>
        <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
          <form onSubmit={handleSubmitNewTodo}>
          <h3 className="font-bold text-lg">Add New Task</h3>
            <div className="modal-action">
              <input value={newTaskValue} onChange={(e)=> setNewTaskValue(e.target.value)} type="text" placeholder="Type here" className="input input-bordered w-full  w-full"/>
              <button type="submit" className="btn">Submit</button>
            </div>
          </form>
        </Modal>
    </div>
  )
}
