import { StyleSheet } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';

import { Test, test_init, test_read, test_create } from "@/components/bdd/test";
import { useEffect, useState } from 'react';

const before_new: Test = {
  idApp: 1,
  value: "java",
  intValue: 20,
};
const before_new2: Test = {
  idApp: 2,
  value: "php",
  intValue: 10000,
};
const before_new3: Test = {
  idApp: 1,
  value: "rust",
  intValue: 99,
};

export default function BddTestScreen() {
  const [after_new,after_newState] = useState({idApp:0,value:"",intValue:0})

  useEffect(() => {
    test_init();
    test_create(before_new);
    test_read().then((val) => {

      if(val != undefined){
        for (const test of val){
          if(test.idApp===before_new.idApp){
            after_newState(test);
          }
        };
      };
    })
  },[]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bdd Test</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="app/(tabs)/bdd_test.tsx" />
      <Text>Test 3  : {after_new.value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
