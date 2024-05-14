import Content from "./components/GrammarCard";
import n1_data from "../../assets/jlptn1.json";
import n2_data from "../../assets/jlptn2.json";
import n3_data from "../../assets/jlptn3.json";
import n4_data from "../../assets/jlptn4.json";
import n5_data from "../../assets/jlptn5.json";
import LevelSelect from "./components/LevelSelect";
import { useParams } from "react-router-dom";
import { CardData } from "../../utils/types";
import { useContext, useEffect, useRef, useState } from "react";
import { SearchContext } from "../../utils/context/SearchContext";
import { uploadBookmarksToFirebase } from "../../utils/functions";
import { useAppSelector } from "../../utils/store";
import { selectCurrentUser } from "../../utils/slices/userReducer";
import { selectBookmarks } from "../../utils/slices/bookmarkReducer";
import ArrowUp from "../../component/ArrowUp";
// import BookmarkPopup from "../../component/BookmarkPopup";

const INITIAL_LOAD = 10; // Number of items to load initially
const BATCH_SIZE = 20; // Number of items to load on each fetch

const JLPTGrammar = () => {
  const { level } = useParams();
  const [search, setSearch] = useState("");
  const [data, setData] = useState<CardData[]>([]);
  const { searchParam, setSearchParam } = useContext(SearchContext);
  const currentUser = useAppSelector(selectCurrentUser);
  const bookmarks = useAppSelector(selectBookmarks);
  // infinite scrolling

  const [isLoading, setIsLoading] = useState(false);
  const [displayedItems, setDisplayedItems] = useState<CardData[]>([]);
  const [itemOffset, setItemOffset] = useState(INITIAL_LOAD);

  // switch between data sets
  useEffect(() => {
    switch (level) {
      case "n1":
        setData(n1_data);
        break;
      case "n2":
        setData(n2_data);
        break;
      case "n3":
        setData(n3_data);
        break;
      case "n4":
        setData(n4_data);
        break;
      case "n5":
        setData(n5_data);
        break;

      default:
        break;
    }
  }, [level]);

  useEffect(() => {
    setSearch(searchParam);
  }, [searchParam]);

  // Update user's firebase bookmark everytime bookmark is changed
  useEffect(() => {
    const uploadToFirebase = async () => {
      await uploadBookmarksToFirebase(currentUser.uid, {
        bookmarkList: bookmarks,
      });
    };
    uploadToFirebase();
  }, [bookmarks]);

  // infinite scrolling setup

  // track current offset using useRef
  const itemOffsetRef = useRef(INITIAL_LOAD);

  useEffect(() => {
    itemOffsetRef.current = itemOffset;
  }, [itemOffset]);

  useEffect(() => {
    setDisplayedItems(
      data
        .filter(
          (ele) =>
            ele.grammar.includes(search) || ele.structure.includes(search)
        )
        .slice(0, INITIAL_LOAD)
    );
    setItemOffset(INITIAL_LOAD);
  }, [data, search, level]);

  // prepare next batch of items
  const loadMoreItems = () => {
    if (isLoading) return;
    setIsLoading(true);

    const currentData = data.filter(
      (ele) => ele.grammar.includes(search) || ele.structure.includes(search)
    );
    // incrementally add more data
    const moreItems = currentData.slice(
      itemOffsetRef.current,
      itemOffsetRef.current + BATCH_SIZE
    );

    setDisplayedItems((prevItems) => [...prevItems, ...moreItems]);
    setItemOffset((prevOffset) => {
      const newOffset = prevOffset + BATCH_SIZE;

      itemOffsetRef.current = newOffset; // update ref manually

      setIsLoading(false);
      return newOffset;
    });
  };
  // handle scroll to load more items
  useEffect(() => {
    const handleScroll = () => {
      // when scroll to bottom of page call loadMoreItems()
      if (
        window.innerHeight + document.documentElement.scrollTop <
        document.documentElement.offsetHeight * 0.95
      ) {
        return;
      }
      loadMoreItems();
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll); //cleanup function 
  }, [data, search]);

  // const [bmIsVisible, setBmIsVisible]  = useState(true)
  // const startAnimation = () => {
  //   setBmIsVisible(true)
  //    setTimeout(() => {
  //     setBmIsVisible(false);
  //   }, 1200);
  // }
  return (
    <div className="flex flex-col innerWidth relative ">
      <ArrowUp/>
      {/* <BookmarkPopup isVisible = {bmIsVisible}/>
      <button onClick={()=>startAnimation()}>asd</button> */}
      <div className="fixed z-50">{isLoading && 'LOADING'}</div>
      <div className="mx-auto mb-5 w-11/12 relative sm:w-5/6">
        {/* Search Bar */}
        <input
          autoComplete="off"
          value={searchParam}
          className="w-full border border-[#00000023] py-2 px-4 rounded-xl focus:outline-red-200"
          onChange={(e) => {
            setSearch(e.target.value);
            setSearchParam(e.target.value);
          }}
          placeholder="検索"
        />
        <button
          className="clear button text-2xl opacity-65 cursor-pointer absolute right-[15px] top-[1px]"
          onClick={() => {
            setSearch("");
            setSearchParam("");
          }}
        >
          x
        </button>
      </div>
      <LevelSelect selected={level} />

      {displayedItems.map((card, i) => (
        <Content key={i} card={card} param={level} />
      ))}
      {displayedItems.length === 0 && (
        <div className="pt-[clamp(200px,40%,300px)] text-center">
          No grammar matched
        </div>
      )}
    </div>
  );
};

export default JLPTGrammar;
