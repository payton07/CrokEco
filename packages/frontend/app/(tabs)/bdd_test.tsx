import { Button, StyleSheet } from 'react-native';

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





async function tab_test_write_read(){
  test_init();
  let retourne = {idApp:0,value:"",intValue:0}
    test_create(before_new);
    let promesse_test_read: Test | null = await test_read(before_new.idApp);
    console.log("2");
    // promesse_test_read.then((res) => {
    //   console.log("3");
    //   if (res != null){
    //     console.log(res.value);
    //     retourne = res;
    //   }
    // });
  return retourne;
}


export default async function TabTwoScreen() {
  const [after_new,after_newState] = useState({idApp:0,value:"",intValue:0})
  // useEffect(() => {
  //   const data = tab_test_write_read();
  //   after_newState(await data);
  // },[]);
  const data = await tab_test_write_read();
  after_newState(data);
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
