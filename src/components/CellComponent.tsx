import { Cell } from '@/models/Cell'
import { FC } from 'react'

interface CellComponentProps {
  cell: Cell
}

const CellComponent: FC<CellComponentProps> = ({ cell }) => {
  return (
    <div
      className={[
        'w-28 h-28 flex justify-center items-center m-1 rounded-md text-5xl text-neutral-800 font-bold',
        cell.tile !== null ? 'bg-neutral-400' : 'bg-neutral-800',
      ].join(' ')}>
      {cell.tile?.value}
    </div>
  )
}

export default CellComponent
