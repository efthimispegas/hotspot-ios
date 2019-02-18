/*  
  console.log('===============');
  console.log('hotpsots after load:', this.props.hotspots);
  console.log('===============');
  const newAdditions = this.compare(this.props.hotspots);
  console.log('===============');
  console.log('new additions:', newAdditions);
  console.log('===============');
  let hotspots = [];
  if (!this.state.hotspots) {
    //in the first load, the state doesn't have an array of hotspots
    hotspots = [...newAdditions];
  } else {
    //this.state.hotspots is an array
    hotspots = [...this.state.hotspots, ...newAdditions];
  }
  console.log('===============');
  console.log('[ComponentWillReceive] next state will have:', hotspots);
  console.log('===============');

  this.setState({ hotspots });

compare(newHotspots) {
  let newAdditions = [];
  console.log('===============');
  console.log('[Compare]newhotspots:', newHotspots);
  console.log('===============');

  //in the first load, put all the hotspots in the state
  if (!this.state.hotspots) {
    newAdditions.push(...newHotspots);
  } else {
    const { hotspots } = this.state;
    console.log('===============');
    console.log("state's hotspots:", hotspots);
    console.log('===============');
    //comparison between the state and the nextProps
    for (let i = 0; i < newHotspots.length; i++) {
      let flag = false;
      for (let j = 0; j < hotspots.length; j++) {
        console.log(
          `comparing new hotspot ${newHotspots[i]._id} with state\'s ${
            hotspots[j]._id
          }`
        );
        if (newHotspots[j]._id === hotspots[i]._id) {
          flag = true;
          break;
        }
      }
      if (!flag) {
        newAdditions.push(newHotspots[i]);
      }
    }
    console.log('===============');
    console.log('[Compare] new hotspots found:', newAdditions);
    console.log('===============');
  }
  return newAdditions;
}

*/
