import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ListItem, Left, Right, Body } from 'native-base';
import { Actions } from 'react-native-router-flux';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions';

import { CustomNavBar, Colors, Spinner } from '../../common';
import { Stats, Hotspot } from '../../api';

class StatisticsScreen extends Component {
  state = {
    isLoading: true,
    totals: null,
    popularity: null,
    maleRatio: null,
    femaleRatio: null
  };

  async componentDidMount() {
    const { users } = await Stats.getTotalUsers();
    const { hotspots } = await Stats.getTotalHotspots();
    const { comments } = await Stats.getTotalComments();
    const { views } = await Stats.getTotalViews();

    const userId = this.props.user._id;

    /* Account Stats */
    const { myHotspots } = await Stats.getUserTotalHotspots(userId);
    const { myComments } = await Stats.getUserTotalComments(userId);

    const userHotspots = await Hotspot.fetchAllUserHotspots(userId);
    /* Insights */
    //implement what is written on the paper

    //popularity
    const { myViews, viewArray } = this.getViewsTotal(userHotspots);

    //here we keep all the metrics
    const totals = {
      hotspots,
      comments,
      views,
      users,
      myHotspots,
      myComments,
      myViews
    };

    this.setState({ totals });

    const avg = myViews / myHotspots;
    const N = viewArray.length;
    let s_sqr = 0;
    for (let i = 0; i < N; i++) {
      s_sqr += (viewArray[i] - avg) * (viewArray[i] - avg);
    }
    const s = Math.sqrt(s_sqr / (N - 1));
    console.log('===============');
    console.log('s:', s);
    console.log('===============');
    console.log('===============');
    console.log('avg:', avg);
    console.log('===============');
    let popularity;
    if (s / avg <= 0.33) {
      if (avg <= 10) {
        popularity = '~50%';
      } else if (avg <= 15) {
        popularity = '~75%';
      } else if (avg <= 20) {
        popularity = '~85%';
      } else {
        popularity = '99%';
      }
    } else if (s / avg <= 0.67 || Math.abs(s - avg) <= 0.5 * avg) {
      popularity = '~50%';
    } else {
      popularity = '<50%';
    }
    console.log('===============');
    console.log('popularity:', popularity);
    console.log('===============');
    this.setState({ popularity });

    //engagement
    const { maleViews, femaleViews } = await Stats.getGenderRatio(userId);
    let maleRatio = (maleViews / (maleViews + femaleViews)) * 100;
    maleRatio = Math.round(maleRatio);
    let femaleRatio = (femaleViews / (maleViews + femaleViews)) * 100;
    femaleRatio = Math.round(femaleRatio);
    console.log('===============');
    console.log('maleRatio:', maleRatio);
    console.log('===============');
    console.log('===============');
    console.log('femaleRatio:', femaleRatio);
    console.log('===============');
    this.setState({ maleRatio, femaleRatio, isLoading: false });
  }

  getViewsTotal(myHotspots) {
    let myViews = 0;
    let viewArray = [];
    myHotspots.map((hotspot, i) => {
      myViews += hotspot.views_count;
      viewArray[i] = hotspot.views_count;
    });
    return { myViews, viewArray };
  }

  render() {
    console.log('===============');
    console.log('this.state:', this.state);
    console.log('===============');
    if (this.state.isLoading) {
      return <Spinner size="large" />;
    }
    return (
      <View style={styles.container}>
        <CustomNavBar
          title="Statistics"
          leftTitle="Back"
          rightTitle={null}
          onLeft={Actions.pop}
          onRight={null}
          margins={{ marginLeft: 90, marginRight: 90 }}
          textColor={{ color: Colors.whiteColor }}
          backgroundColor={{ backgroundColor: Colors.hotspotColor }}
        />
        <View style={styles.container}>
          <ListItem itemDivider>
            <Text style={styles.separator}>ACCOUNT STATS</Text>
          </ListItem>
          <ListItem icon>
            <Left />
            <Body>
              <Text>Number of Hotspots:</Text>
            </Body>
            <Right>
              <Text>{this.state.totals.myHotspots}</Text>
            </Right>
          </ListItem>
          <ListItem icon>
            <Left />
            <Body>
              <Text>Number of Comments:</Text>
            </Body>
            <Right>
              <Text>{this.state.totals.myComments}</Text>
            </Right>
          </ListItem>
          <ListItem icon>
            <Left />
            <Body>
              <Text>Number of Views:</Text>
            </Body>
            <Right>
              <Text>{this.state.totals.myViews}</Text>
            </Right>
          </ListItem>
          <ListItem itemDivider>
            <Text style={styles.separator}>INSIGHTS</Text>
          </ListItem>
          <ListItem icon>
            <Left />
            <Body>
              <Text>Popularity:</Text>
            </Body>
            <Right>
              <Text>{this.state.popularity}</Text>
            </Right>
          </ListItem>
          <ListItem icon>
            <Left />
            <Body>
              <Text>Engagement:</Text>
            </Body>
            <Right>
              <Text>76%</Text>
            </Right>
          </ListItem>
          <ListItem itemDivider>
            <Text style={styles.separator}>AUDIENCE</Text>
          </ListItem>
          <ListItem icon>
            <Left />
            <Body>
              <Text>Male Ratio:</Text>
            </Body>
            <Right>
              <Text>{`${this.state.maleRatio}%`}</Text>
            </Right>
          </ListItem>
          <ListItem icon>
            <Left />
            <Body>
              <Text>Female Ratio:</Text>
            </Body>
            <Right>
              <Text>{`${this.state.femaleRatio}%`}</Text>
            </Right>
          </ListItem>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    backgroundColor: Colors.whiteColor
  },
  separator: {
    fontSize: 12,
    color: Colors.lightGreyColor
  }
});

const mapStoreToProps = store => {
  return {
    user: store.auth.user.info,
    myHotspots: store.hotspots.myHotspots
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadUserHotspots: bindActionCreators(actions.loadUserHotspots, dispatch)
  };
};

export default connect(
  mapStoreToProps,
  mapDispatchToProps
)(StatisticsScreen);
