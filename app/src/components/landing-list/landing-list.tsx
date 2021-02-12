  
import * as React from 'react'
import ListItem from '../list-item/list-item'
interface LandingListProps {
    gifs : any[]
}
const LandingList : React.FunctionComponent<LandingListProps> = (props) => {
  const gifList = props.gifs.map((gif: { id: any }, i: string | number | null | undefined) =>
    <div className="" key={i}>
        <ListItem gif={gif} key={gif.id} />
    </div>
  )

  return (
        <div className="grid grid-cols-7 gap-4 ">
          {gifList}
        </div>
  )
}

export default LandingList