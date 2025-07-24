import React from 'react'
import { Axe, Instances as Axes } from 'features/Game/Dungeon/presentation/GameObject/Prop/Axe'
import { Sword, Instances as Swords } from 'features/Game/Dungeon/presentation/GameObject/Prop/Sword'
import { Dagger, Instances as Daggers } from 'features/Game/Dungeon/presentation/GameObject/Prop/Dagger'
import { Key, Instances as Keys } from 'features/Game/Dungeon/presentation/GameObject/Prop/Key'
import { Chest, Instances as Chests } from 'features/Game/Dungeon/presentation/GameObject/Prop/Chest'
import { useSelector } from 'react-redux'
import {
  selectAxeLoots,
  selectChests,
  selectDaggerLoots,
  selectKeyLoots,
  selectSwordLoots
} from 'features/Game/Dungeon/application/slice'

export const Loots: React.FC = () => {
  const axes = useSelector(selectAxeLoots)
  const daggers = useSelector(selectDaggerLoots)
  const swords = useSelector(selectSwordLoots)
  const keys = useSelector(selectKeyLoots)
  const chests = useSelector(selectChests)

  return (
    <>
      <Axes>
        {axes.map(axe => <Axe key={axe.id} position={[axe.coords[0] * 8, 1, axe.coords[1] *  8]} />)}
      </Axes>
      <Daggers>
        {daggers.map(dagger => <Dagger key={dagger.id} position={[dagger.coords[0] * 8, 1, dagger.coords[1] *  8]} />)}
      </Daggers>
      <Swords>
        {swords.map(sword => <Sword key={sword.id} position={[sword.coords[0] * 8, 1, sword.coords[1] *  8]} />)}
      </Swords>
      <Keys>
        {keys.map(key => <Key key={key.id} position={[key.coords[0] * 8, 1, key.coords[1] *  8]} />)}
      </Keys>
      <Chests>
        {chests.map(chest => <Chest key={chest.id} position={[chest.coords[0] * 8, 1, chest.coords[1] *  8]} />)}
      </Chests>
    </>
  )
}
