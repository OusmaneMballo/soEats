import React from 'react';
import {View, Text,TextInput, ScrollView, Image } from 'react-native';
import { styles } from './rectangleHoursStyle';

export default class RectangleHours extends React.Component{
    render(){
        let openingHours=[{'dayOfWeek':'Dimanche','hours': null},{'dayOfWeek':'Lundi','hours': null},{'dayOfWeek':'Mardi','hours': null},{'dayOfWeek':'Mercredi','hours': null},{'dayOfWeek':'Jeudi','hours': null},{'dayOfWeek':'Vendredi','hours': null},{'dayOfWeek':'Samedi','hours': null}];
        this.props.openingHours.map((openingHour)=>{
            if(openingHour.dayOfWeek==0){
                openingHours[0]={'dayOfWeek': "Dimanche", 'hours': openingHour};
            }
            else{
                if(openingHour.dayOfWeek==1){
                    openingHours[1]={'dayOfWeek': "Lundi", 'hours': openingHour};
                }
                else{
                  if(openingHour.dayOfWeek==2){
                    openingHours[2]={'dayOfWeek': "Mardi", 'hours': openingHour};
                  }
                  else{
                    if(openingHour.dayOfWeek==3){
                        openingHours[3]={'dayOfWeek': "Mercredi", 'hours': openingHour};
                    }
                    else{
                      if(openingHour.dayOfWeek==4){
                        openingHours[4]={'dayOfWeek': "Jeudi", 'hours': openingHour};
                      }
                      else{
                        if(openingHour.dayOfWeek==5){
                            openingHours[5]={'dayOfWeek': "Vendredi", 'hours': openingHour};
                        }
                        else{
                          if(openingHour.dayOfWeek==6){
                            openingHours[6]={'dayOfWeek': "Samedi", 'hours': openingHour};
                          }
                        }
                      }
                    }
                  }
                }
              }
        })
        return(
            <View style = {styles.container}>
                <View style ={styles.title_hourly}>
                    <Image
                        style={styles.icon_hourly}
                        source={require('../../../assets/icons/calendar.png')} 
                    />
                    <Text  style={styles.hourly}>Horaires</Text>
                </View>
                <ScrollView>
                    {
                        openingHours.map((openingHour)=>{

                            if(openingHour.hours!=null ){

                                if(openingHour.hours.slot1==null && openingHour.hours.slot2!=null){
                                    return (
                                                <View style={styles.text_hourly_content}  key={openingHour.dayOfWeek.toString()}>
                                                    <Text style={styles.text_hourly}>{openingHour.dayOfWeek}</Text>
                                                    <Text style={styles.text_hourly_time}> Fermé  {openingHour.hours.slot2?.startTime} - {openingHour.hours.slot2?.endTime}</Text>
                                                </View>
                                            )
                                }
                                else{
                                    if(openingHour.hours.slot1!=null && openingHour.hours.slot2==null){
                                        return (
                                                    <View style={styles.text_hourly_content} key={openingHour.dayOfWeek.toString()}>
                                                        <Text style={styles.text_hourly} >{openingHour.dayOfWeek} </Text>
                                                        <Text style={styles.text_hourly_time}>{openingHour.hours.slot1?.startTime} - {openingHour.hours.slot1?.endTime}</Text>
                                                    </View>
                                                )
                                    }
                                    else{
                                        return (
                                                    <View style={styles.text_hourly_content} key={openingHour.dayOfWeek.toString()}>
                                                        <Text style={styles.text_hourly}>{openingHour.dayOfWeek}</Text>
                                                        <Text style={styles.text_hourly_time}> {openingHour.hours.slot1?.startTime} - {openingHour.hours.slot1?.endTime}</Text>
                                                    </View>
                                                )
                                    }
                                }
                            }
                            else{
                                return (
                                            <View style={styles.text_hourly_content} key={openingHour.dayOfWeek.toString()}>
                                                <Text style={styles.text_hourly}>{openingHour.dayOfWeek}</Text>
                                                <Text style={styles.text_hourly_time}> Fermé</Text>
                                            </View>
                                        )
                            }
                        })
                    }
                </ScrollView>
            </View>
        )
    }
    
}