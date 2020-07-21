import * as React from 'react';
import { Appbar } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';

const Header = (props) => {
    return (
        <Appbar.Header dark={true}>
            <StatusBar style='light'/>
            <Appbar.Content title={props.title} subtitle='Looking for new data in ....'/>
        </Appbar.Header>
    );
}
export default Header;