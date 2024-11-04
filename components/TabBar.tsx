import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { AntDesign, Feather } from "@expo/vector-icons";

const TabBar = ({ state, descriptors, navigation }: any) => {
  const primaryColor = "#0891b2";
  const greyColor = "#737373";

  // Define icons to match route names
  const icons: Record<string, any> = {
    index: (props: any) => (
      <AntDesign name="home" size={26} color={greyColor} {...props} />
    ),
    explore: (props: any) => (
      <Feather name="compass" size={26} color={greyColor} {...props} />
    ),
    create: (props: any) => (
      <AntDesign name="pluscircle" size={26} color={greyColor} {...props} />
    ),
    profile: (props: any) => (
      <AntDesign name="user" size={26} color={greyColor} {...props} />
    ),
  };

  return (
    <View style={styles.tabBar}>
      {state.routes.map((route: any, index: any) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        // Skip unwanted routes
        if (["_sitemap", "+not-found"].includes(route.name)) return null;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        // Use the icon corresponding to the route name, or a fallback icon
        const IconComponent = icons[route.name] || icons["index"];

        return (
          <TouchableOpacity
            key={route.name}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tabBarItem}
          >
            <IconComponent color={isFocused ? primaryColor : greyColor} />
            <Text
              style={{
                color: isFocused ? primaryColor : greyColor,
                fontSize: 11,
              }}
            >
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default TabBar;

const styles = StyleSheet.create({
  tabBar: {
    position: "absolute",
    bottom: 25,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "white",
    marginHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 25,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowRadius: 10,
    shadowOpacity: 0.1,
  },
  tabBarItem: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 4,
  },
});
