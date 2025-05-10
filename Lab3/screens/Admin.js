import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";

import Transaction from "./Transaction";
import Setting from "./Setting";
import Customer from "./Customer";

const Tab = createMaterialBottomTabNavigator()

const Admin = ()=>{
    return (
        <Tab.Navigation>
            <Tab.Screen name="RouterService" component={RouterService}
                options={{
                    title:"Home",
                    tabBarIcon:"home"
                }}
            />
            <Tab.Screen name="Transaction" compenent={Transaction}
                options={{
                    tabBarIcon:"cash"
                }}
            />
            <Tab.Screen name="Customers" compenent={Customers}
                options={{
                    tabBarIcon:"account"
                }}
            />
            <Tab.Screen name="Setting" compenent={Setting}
                options={{
                    tabBarIcon:"cog"
                }}
            />
        </Tab.Navigation>
    )
}
export default Admin;