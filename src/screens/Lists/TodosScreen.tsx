import React, {useState, useEffect, useRef} from 'react';
import {StyleSheet, View, SectionList, Text, Pressable} from 'react-native';
import {EmptyList} from './Components/EmptyList';
import {ListItem} from './Components/ListItem';
import {useTheme} from '../../utils/hooks';
import {getModerateScale} from '../../utils/Scaling';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useSelector} from 'react-redux';
import {getTodosState} from '../../store/rootSelectors';
import {ITodo} from '../../store/types/todosTypes';
import {SearchBar} from './Components/SearchBar';
import {defaultBorderRadius} from '../../utils/constants';
import {parseTodosForSectionList} from '../../utils/functions';
import {CategoriesBar} from './Components/CategoriesBar';
import {Icon} from 'react-native-elements';
import {useNavigationState} from '@react-navigation/core';
import DefaultButtonGroup from '../../components/DefaultButtonGroup';

const ICON_SIZE = 20;
const CATEGORIES = [
  {
    title: 'Not done',
    key: 'default',
  },
  {
    title: 'Done',
    key: 'done',
  },
];

const TodosScreen = () => {
  const {styles, colors} = useStyles();
  const itemRef = useRef<any>(null);
  const {list} = useSelector(getTodosState);
  const navState = useNavigationState(state => state);

  const [data, setData] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [selectedIndex, selectIndex] = useState<number>(0);
  const [areCategoriesVisible, showCategories] = useState(false);
  const [categories, setCategories] = useState<string[]>([]);
  const [numberOfItems, setNumberOfItems] = useState<number[]>([0, 0]);

  const handleShowCategories = () => showCategories(prev => !prev);

  const renderItem = (itemData: {item: ITodo}) => {
    return (
      <ListItem
        ref={itemRef}
        {...itemData.item}
        selectedCategory={CATEGORIES[selectedIndex].key as ITodo['status']}
      />
    );
  };

  const renderSectionHeader = (itemData: {section: any}) => {
    return (
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>{itemData.section.title}</Text>
      </View>
    );
  };

  const filterListByTitle = (l: ITodo[]) =>
    l.filter(i => i.title.toLowerCase().indexOf(search.toLowerCase()) >= 0);

  useEffect(() => {
    const status = CATEGORIES[selectedIndex].key;

    if (list?.length > 0) {
      let filtered = filterListByTitle(list).filter(i => i.status !== 'done');
      let done = filterListByTitle(list).filter(i => i.status === 'done');

      setNumberOfItems([filtered.length, done.length]);

      filtered = status === 'done' ? [...filtered, ...done] : [...filtered];

      if (status !== 'default') {
        filtered = filtered.filter(i => i.status === status);
      }

      if (categories.length > 0) {
        filtered = filtered.filter(i =>
          categories.includes(i.colorParams.color),
        );
      }

      setData(parseTodosForSectionList(filtered));
    } else {
      setNumberOfItems([0, 0]);
      setData([]);
    }

    return () => {
      itemRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedIndex, list, search, categories]);

  useEffect(() => {
    showCategories(false);

    if (itemRef.current) {
      itemRef.current.close();
    }
  }, [navState]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerBar}>
        <View style={styles.searchBar}>
          <SearchBar onSearch={setSearch} />
          <Pressable
            style={styles.categoriesButton}
            onPress={handleShowCategories}>
            <Icon
              type={'ionicons'}
              name={'grid-view'}
              color={colors.darkGrey}
              size={getModerateScale(ICON_SIZE)}
            />
          </Pressable>
        </View>
        {areCategoriesVisible && list.length > 0 ? (
          <View style={styles.categoriesBar}>
            <View style={styles.cut} />
            <CategoriesBar
              data={[...new Set(list.map(i => i.colorParams.color))]}
              onSelect={setCategories}
            />
          </View>
        ) : null}
        <DefaultButtonGroup
          buttons={CATEGORIES.map(c => c.title)}
          keyExtractor={'Category'}
          onPress={selectIndex}
          selectedIndex={selectedIndex}
          numberOfItems={numberOfItems}
          textStyle={styles.buttonTextStyle}
          containerStyle={styles.buttonContainer}
          selectedTextStyle={styles.selectedButtonText}
        />
      </View>
      {data.length === 0 ? (
        <View style={[styles.contentContainer, styles.emptyListContainer]}>
          <EmptyList />
        </View>
      ) : (
        <SectionList
          sections={data}
          renderItem={renderItem}
          renderSectionHeader={renderSectionHeader}
          keyExtractor={item => item.id}
          stickySectionHeadersEnabled={true}
        />
      )}
    </SafeAreaView>
  );
};

export default TodosScreen;

const useStyles = () => {
  const {colors, fonts, userTheme} = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    contentContainer: {
      flexGrow: 1,
      alignItems: 'center',
    },
    buttonContainer: {
      borderRadius: defaultBorderRadius,
      height: getModerateScale(45),
      backgroundColor: userTheme.background,
      marginVertical: getModerateScale(12),
      shadowColor: colors.black,
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.22,
      shadowRadius: 2.22,
      elevation: 3,
    },
    buttonGroupBorder: {
      width: 0,
    },
    buttonTextStyle: {
      fontSize: fonts.regular,
      color: colors.darkGrey,
      fontWeight: 'bold',
    },
    selectedButtonText: {
      color: userTheme.text,
    },
    emptyListContainer: {
      justifyContent: 'center',
    },
    headerContainer: {
      backgroundColor: userTheme.primary,
      paddingVertical: getModerateScale(12),
      alignItems: 'center',
    },
    headerText: {
      color: colors.darkGrey,
      fontWeight: '500',
      fontSize: fonts.regular,
    },
    headerBar: {
      paddingHorizontal: getModerateScale(10),
      marginVertical: getModerateScale(6),
    },
    searchBar: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    categoriesButton: {
      alignItems: 'center',
      justifyContent: 'center',
      width: getModerateScale(42),
      height: getModerateScale(42),
      marginLeft: getModerateScale(10),
    },
    categoriesBar: {
      backgroundColor: userTheme.background,
      paddingHorizontal: getModerateScale(12),
      paddingVertical: getModerateScale(6),
      borderRadius: defaultBorderRadius,
      borderWidth: 1,
      borderColor: userTheme.border,
      position: 'relative',
      marginTop: getModerateScale(6),
    },
    cut: {
      width: ICON_SIZE,
      height: ICON_SIZE,
      backgroundColor: userTheme.background,
      position: 'absolute',
      top: -ICON_SIZE / 2,
      right: ICON_SIZE / 2,
      borderLeftColor: userTheme.border,
      borderTopColor: userTheme.border,
      borderRightColor: 'transparent',
      borderBottomColor: 'transparent',
      borderWidth: 1,
      transform: [{rotateZ: '45deg'}],
    },
  });

  return {styles, colors};
};
