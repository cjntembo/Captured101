import React from "react"
import { Route } from "react-router"
import { UserProvider} from "./users/UserProvider"
import { UserList } from "./users/UserList"
import { UserDetail } from "./users/UserDetail"
import { UserForm } from "./users/UserForm"
import { ProfileProvider } from "./profiles/ProfileProvider"
import { ProfileList } from "./profiles/ProfileList"
import { ProfileForm } from "./profiles/ProfileForm"
import { ProfileDetail } from "./profiles/ProfileDetail"
import { PeopleProvider } from "./peoples/PeopleProvider"
import { PeopleList } from "./peoples/PeopleList"
import { PeopleForm } from "./peoples/PeopleForm"
import { PeopleSearch } from "./peoples/PeopleSearch"
import { PeopleDetail } from "./peoples/PeopleDetail"
import { MemoryList } from "./memories/MemoryList"
import { MemoryForm } from "./memories/MemoryForm"
import { MemorySearch } from "./memories/MemorySearch"
import { MemoryProvider } from "./memories/MemoryProvider"
import { MemoryDetail } from "./memories/MemoryDetail"
import { HomePageProvider } from "./homePage.js/HomePageProvider"
import { HomePageForm } from "./homePage.js/HomePageForm"
import { HomePageList } from "./homePage.js/HomePageList"
import { HomePageSearch } from "./homePage.js/HomePageSearch"

export const ApplicationViews = () => {
  return (
    <>

      <UserProvider>
        <ProfileProvider>
          <PeopleProvider>
            <MemoryProvider>
              <HomePageProvider>

                {/* <Route exact path="/">
                  <UserList />
                </Route> */}

                <Route exact path="/">
                  <HomePageList />
                  <HomePageSearch />
                  <HomePageForm />
                </Route>
               

                

                <Route exact path="/users">
                  <UserList />
                </Route>
                <Route exact path="/users/create">
                  <UserForm />
                </Route>
                <Route exact path="users/detail/:usersId(\d+)">
                  <UserDetail />
                </Route>

                <Route exact path="/profiles">
                  <ProfileList />
                </Route>
                <Route exact path="/profiles/create">
                  <ProfileForm />
                </Route>
                <Route exact path="/profiles/edit/:profileId(\d+)">
                  <ProfileForm />
                </Route>
                <Route exact path="/profiles/detail/:profileId(\d+)">
                  <ProfileDetail />
                </Route>

                <Route exact path="/peoples">
                  <PeopleList />
                  <PeopleSearch />
                </Route>
                <Route exact path="/peoples/create">
                  <PeopleForm />
                </Route>
                <Route exact path="/peoples/edit/:peopleId(\d+)">
                  <PeopleForm />
                </Route>
                <Route exact path="/peoples/detail/:peopleId(\d+)">
                  <PeopleDetail />
                </Route>

                <Route exact path="/memories">
                  <MemoryList />
                  <MemorySearch />
                </Route>
                <Route exact path="/memories/create">
                  <MemoryForm />
                </Route>
                <Route exact path="/memories/edit/:memoryId(\d+)">
                  <MemoryForm />
                </Route>
                <Route exact path="/memories/detail/:memoryId(\d+)">
                  <MemoryDetail />
                </Route>
              </HomePageProvider>
            </MemoryProvider>
          </PeopleProvider>
        </ProfileProvider>
      </UserProvider>

    </>
  )
}