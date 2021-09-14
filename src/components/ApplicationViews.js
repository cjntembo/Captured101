import React from "react"
import { Route } from "react-router"
import { UserProvider} from "./users/UserProvider"
import { UserList } from "./users/UserList"
import { UserDetail } from "./users/UserDetail"
import { UserForm } from "./users/UserForm"
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

export const ApplicationViews = () => {
  return (
    <>
      
      <UserProvider>
        <PeopleProvider>
          <MemoryProvider>
            <Route exact path="/">
              <UserList />
            </Route>

            <Route exact path="/users">
              <UserList />
              
            </Route>
            <Route exact path="/users/create">
              <UserForm />
            </Route>
            <Route exact path="users/detail/:userId(\d+)">
              <UserDetail />
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

          </MemoryProvider>
        </PeopleProvider>
      </UserProvider>

    </>
  )
}