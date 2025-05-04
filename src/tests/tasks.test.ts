import { describe, beforeEach, afterEach, it, expect } from "vitest";
import { setActivePinia, createPinia } from "pinia";
// import { mount } from "@vue/test-utils";
// import { createTestingPinia } from "@pinia/testing";
// import any store you want to interact with in tests
import { useTasksStore } from "@/stores/tasks";

// const wrapper = mount(Counter, {
//   global: {
//     plugins: [createTestingPinia()],
//   },
// });

describe("Tasks store", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    // populate store with some data
    const store = useTasksStore();
    store.tasks = [
      { id: 0, title: "task 1", color: "#a8dadc", status: "to-do" },
      { id: 1, title: "task 2", color: "#cdb4db", status: "in-progress" },
      { id: 2, title: "task 3", color: "#a8dadc", status: "done" },
    ];
  });

  it("sorts tasks", () => {
    const store = useTasksStore();
    const sortedTasks = store.sortedTasks;
    expect(sortedTasks).toStrictEqual({
      to_do: [{ id: 0, title: "task 1", color: "#a8dadc", status: "to-do" }],
      in_progress: [{ id: 1, title: "task 2", color: "#cdb4db", status: "in-progress" }],
      done: [{ id: 2, title: "task 3", color: "#a8dadc", status: "done" }],
    });
  });

  it("updates task status", () => {
    const store = useTasksStore();
    store.updateTaskStatus(1, "done");
    const sortedTasks = store.sortedTasks;
    expect(sortedTasks).toStrictEqual({
      to_do: [{ id: 0, title: "task 1", color: "#a8dadc", status: "to-do" }],
      in_progress: [],
      done: [
        { id: 1, title: "task 2", color: "#cdb4db", status: "done" },
        { id: 2, title: "task 3", color: "#a8dadc", status: "done" },
      ],
    });
  });

  afterEach(() => {
    const store = useTasksStore();
    store.tasks = [];
  });
});

// // actions are stubbed by default, meaning they don't execute their code by default.
// // See below to customize this behavior.
// store.someAction();

// expect(store.someAction).toHaveBeenCalledTimes(1);
// expect(store.someAction).toHaveBeenLastCalledWith();
