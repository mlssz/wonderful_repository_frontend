
  //items : {pkey: string , hash: string} 
  //        or {pkey: '-'} 
  //        or {pkey: string , hash: string, click: func} 
function CreateMenuList(itemList){

    let menuList = itemList.map((elf) => {
      let componentName = MenuItem
      let componentProp = {}

      if(elf.pkey === '-'){
        componentName = Divider
      }else{
        componentProp['primaryText'] = elf['pkey']

        if(elf['click'] !== undefined && typeof elf['click'] === 'function'){
          componentProp['onTouchTap'] = elf['click']
        }else{
          componentProp['onTouchTap'] = () => hashChange(elf['hash'])
        }
      }

      return React.createElement(componentName, componentProp)
    })
    menuList.push(<MenuItem primaryText='Close' onTouchTap={() => CloseWindow()} />)

    return menuList
    
}
