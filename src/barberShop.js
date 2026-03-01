import { useState } from 'react'

export function App () {
  const [open, setOpen] = useState(false)
  const [list, setList] = useState([])

  return (
    <div className='bg-slate-200 h-screen'>
      <Header />
      <Form open={open} onSetOpen={setOpen} list={list} onSetList={setList} />

      {open && (
        <Modal
          open={open}
          onSetOpen={setOpen}
          list={list}
          onSetList={setList}
        />
      )}
    </div>
  )
}

function Header () {
  return (
    <div className='flex justify-between p-5 '>
      <h1 className='font-semibold'>Online Appointment Booking</h1>
      <button className='text-xs bg-blue-800 text-white p-2 rounded-md'>
        My Appointment
      </button>
    </div>
  )
}

function Form ({ list, onSetList, open, onSetOpen }) {
  const [option, setOption] = useState('Haircut')
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10))
  const [time, setTime] = useState('10:00 AM')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState(0)
  console.log(open)

  function handleForm (e) {
    e.preventDefault()
    onSetList([
      ...list,
      { option: option, date: date, time: time, name: name, phone: phone }
    ])
    setName('')
    setPhone(0)
  }
  console.log(list)

  return (
    <div className='flex  w-[90vw] justify-center gap-5 '>
      <div className='bg-white max-w-[50%] min-w-[25%] p-5 flex flex-col rounded-lg shadow-md'>
        <h2 className='pb-2 border-b border-b-zinc-400 '>
          Book an Appointment
        </h2>
        <form>
          <label className='text-zinc-800 text-sm mt-2 mb-1'>
            Select Service
          </label>
          <select
            className='shadow shadow-black mb-3 w-full'
            value={option}
            onChange={e => setOption(e.target.value)}
          >
            <option>Haircut</option>
            <option>Beard Trimming</option>
          </select>
          <label className='text-zinc-800 text-sm mt-2 '>Select Date</label>
          <input
            className='shadow shadow-black mb-3 w-full mt-2'
            type='date'
            value={date}
            onChange={e => setDate(e.target.value)}
            placeholder='March 10, 2024'
          ></input>
          <label className='text-zinc-800 text-sm mt-2 mb-1 w-full'>
            Select Time
          </label>
          <select onChange={e => setTime(e.target.value)} value={time}>
            <option>10:00 AM</option>
            <option>11:00 AM</option>
            <option>12:00 AM</option>
          </select>
          <label className='text-zinc-800 text-sm mt-2 mb-1'>
            Your Details
          </label>
          <input
            value={name}
            type='text'
            placeholder='Your Name'
            onChange={e => setName(e.target.value)}
            className='shadow shadow-black mb-3 w-full'
          ></input>
          <input
            type='number'
            value={phone}
            placeholder='Your Phone'
            className='shadow shadow-black mb-3 w-full'
            onChange={e => setPhone(e.target.value)}
          ></input>
          <button
            className='text-sm bg-green-900 text-white p-2 rounded-md w-full'
            onClick={handleForm}
          >
            Book Appointment
          </button>
        </form>
      </div>

      {list.length > 0 && (
        <Upcoming
          list={list}
          onSetList={onSetList}
          open={open}
          onSetOpen={onSetOpen}
        />
      )}
    </div>
  )
}

function Upcoming ({ list, onSetList, open, onSetOpen }) {
  function handleDelete (index) {
    onSetList(list.filter((_, indexI) => index !== indexI))
  }
  return (
    <div className='bg-white rounded p-5 h-full min-w-[65%] '>
      <h2 className='m-4 pb-1 border-b border-b-zinc-300 font-semibold'>
        Upcoming Appiontments
      </h2>

      <div className='flex '>
        <img
          src='/img/baberShop.jpg'
          className='w-1/2 rounded h-[330px] object-cover'
        ></img>
        {list.map((item, index) => {
          return (
            <div
              key={index}
              className='rounded border border-stone-300 w-[50%] h-fit p-3 mb-2 '
            >
              <h2>{item.name}</h2>
              <span>{item.option}</span>
              <div>
                <div className='flex '>
                  <p className='flex-1'>
                    {item.date} <span>{item.time}</span>
                  </p>

                  <button
                    className='bg-blue-950 text-white text-xs p-1 rounded mr-2'
                    onClick={() => onSetOpen(!open)}
                  >
                    Veiw
                  </button>
                  <button
                    className='bg-red-800 text-white text-xs p-1 rounded'
                    onClick={() => handleDelete(index)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function Modal ({ open, onSetOpen, list, onSetList }) {
  const [close, setClose] = useState(true)

  function handleDelete (i) {
    onSetList(list.filter((_, index) => i !== index))
    setClose(!close)
  }
  return (
    <div>
      <div
        className={
          close
            ? 'bg-white w-[250px] border-2 border-zinc-400 p-4 rounded absolute top-1/3 left-1/3'
            : 'hidden'
        }
      >
        <h2 className='  w-full pb-1 border-b border-b-stone-700'>
          Appointment Details
        </h2>

        {list.map((item, i) => {
          return (
            <>
              <p>Service: {item.option}</p>
              <p>Date: {item.date}</p>
              <p className='pb-2 border-b border-b-stone-700'>
                Time: {item.time}
              </p>
              <div>
                Contact:
                <p>{item.name} </p>
                <p>{item.phone} </p>
              </div>
              <div className='flex justify-between mt-2'></div>
              <div className='flex justify-between'>
                <button
                  className='text-sm border p-1 rounded border-zinc-600 '
                  onClick={() => setClose(!close)}
                >
                  Close
                </button>
                <button
                  className='text-xs bg-red-700 text-white p-1 rounded'
                  onClick={() => handleDelete(i)}
                >
                  Cancel Appointment
                </button>
              </div>
            </>
          )
        })}
      </div>
    </div>
  )
}
