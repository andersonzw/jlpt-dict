import Content from "./components/GrammarCard";
import n1_data from "../../assets/jlptn1.json";
import n2_data from "../../assets/jlptn2.json";
import n3_data from "../../assets/jlptn3.json";
import n4_data from "../../assets/jlptn4.json";
import n5_data from "../../assets/jlptn5.json";
import LevelSelect from "./components/LevelSelect";
import { useParams } from "react-router-dom";
import { CardData } from "../../utils/types";
import { useContext, useEffect, useState } from "react";
import { SearchContext } from "../../utils/context/SearchContext";
import { uploadBookmarksToFirebase } from "../../utils/functions";
import { useAppSelector } from "../../utils/store";
import { selectCurrentUser } from "../../utils/slices/userReducer";
import { selectBookmarks } from "../../utils/slices/bookmarkReducer";

const INITIAL_LOAD = 10; // Number of items to load initially
const BATCH_SIZE = 10; // Number of items to load on each fetch

const JLPTGrammar = () => {
  const { level } = useParams();
  const [search, setSearch] = useState("");
  const [data, setData] = useState<CardData[]>([]);
  const { searchParam, setSearchParam } = useContext(SearchContext);
  const currentUser = useAppSelector(selectCurrentUser);
  const bookmarks = useAppSelector(selectBookmarks);

  const [displayedItems, setDisplayedItems] = useState<CardData[]>([]);
  const [itemOffset, setItemOffset] = useState(INITIAL_LOAD);

  // Only runs during page change
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
  }, [data, search]);

  // prepare next batch of items
  const loadMoreItems = () => {
    const currentData = data.filter(
      (ele) => ele.grammar.includes(search) || ele.structure.includes(search)
    );
    const moreItems = currentData.slice(itemOffset, itemOffset + BATCH_SIZE);
    setDisplayedItems((prevItems) => [...prevItems, ...moreItems]);
    setItemOffset((prevOffset) => prevOffset + BATCH_SIZE);
  };

  // Handle scroll to load more items
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight
      ) {
        return;
      }
      loadMoreItems();
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [data, search]);

  return (
    <div className="flex flex-col innerWidth p-1">
      <div className="mx-auto mb-5  w-11/12 relative sm:w-5/6">
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
