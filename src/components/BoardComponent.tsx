'use client'
import React, { FC, useCallback, useEffect, useState } from 'react'
import { Board } from '@/models/Board'
import CellComponent from './CellComponent'
import MobileSwiper from './MobileSwiper'

const BoardComponent: FC = () => {
  const [board, setBoard] = useState<null | Board>(null)

  useEffect(() => {
    start()
  }, [])

  useEffect(() => {
    document.addEventListener('keydown', keyDownHandler)

    return () => {
      document.removeEventListener('keydown', keyDownHandler)
    }
  }, [board])

  const keyDownHandler = (e: KeyboardEvent) => {
    if (board === null) return

    if (e.code === 'ArrowUp' || e.code === 'KeyW') board.moveUp()

    if (e.code === 'ArrowDown' || e.code === 'KeyS') board.moveDown()

    if (e.code === 'ArrowLeft' || e.code === 'KeyA') board.moveLeft()

    if (e.code === 'ArrowRight' || e.code === 'KeyD') board.moveRight()

    updateBoard()
  }

  const handleSwipe = useCallback(
    ({ deltaX, deltaY }: { deltaX: number; deltaY: number }) => {
      if (board === null) return

      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        if (deltaX > 0) {
          console.log(1)
          board.moveRight()
        } else {
          console.log(2)
          board.moveLeft()
        }
      } else {
        if (deltaY > 0) {
          console.log(3)
          board.moveDown()
        } else {
          console.log(4)
          board.moveUp()
        }
      }
      updateBoard()
    },
    [board]
  )

  const start = () => {
    const gameState = localStorage.getItem('gameState')

    if (gameState !== null) {
      const newBoard = new Board(gameState)
      return setBoard(newBoard)
    }

    const newBoard = new Board()
    newBoard.initCells()
    newBoard.prepareForStart()
    setBoard(newBoard)
  }

  const restart = () => {
    const newBoard = new Board()
    newBoard.initCells()
    newBoard.prepareForStart()
    setBoard(newBoard)
  }

  const updateBoard = () => {
    if (board === null) return

    const newBoard = board.getCopyBoard()
    setBoard(newBoard)
  }

  return (
    <React.Fragment>
      <div className='flex self-start'>
        <div className='px-5 py-2 flex flex-col justify-center items-center m-1 rounded-md text-3xl font-light bg-neutral-800'>
          <div className='text-lg'>turn</div>
          <div>{board?.turn}</div>
        </div>
        <div className='px-5 py-2 flex flex-col justify-center items-center m-1 rounded-md text-3xl font-light bg-neutral-800'>
          <div className='text-lg'>score</div>
          <div>{board?.score}</div>
        </div>
        <div className='px-5 py-2 flex flex-col justify-center items-center m-1 rounded-md text-3xl font-light bg-neutral-800'>
          <div className='text-lg'>best score</div>
          <div>{board?.bestScore}</div>
        </div>
      </div>
      <MobileSwiper onSwipe={handleSwipe}>
        <div className='w-[340px] h-[340px] sm:w-[488px] sm:h-[488px] flex bg-neutral-900 flex-wrap p-0.5 sm:p-1 rounded-md self-center'>
          {board?.cells.map((row, index) => (
            <React.Fragment key={index}>
              {row.map((cell) => (
                <CellComponent key={cell.id} cell={cell} />
              ))}
            </React.Fragment>
          ))}
        </div>
      </MobileSwiper>
      <p className='mt-1 text-2xl leading-8 font-medium'>Use your arrow keys or WASD to move the tiles.</p>
      <button
        type='button'
        onClick={restart}
        className='flex w-full justify-center rounded-md text-2xl bg-neutral-800 px-3 py-2 font-medium leading-6 text-white shadow-sm hover:bg-neutral-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>
        Restart
      </button>
    </React.Fragment>
  )
}

export default BoardComponent
