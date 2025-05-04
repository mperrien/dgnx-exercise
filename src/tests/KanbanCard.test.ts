import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import KanbanCard from "@/components/kanban/KanbanCard.vue";

import type { Task } from "@/types/tasks";

const testTask: Task = {
  id: 1,
  title: "My task title",
  color: "#a8dadc",
  status: "to-do",
};

describe("KanbanCard", () => {
  it("renders title", () => {
    const wrapper = mount(KanbanCard, {
      props: { task: testTask },
    });
    expect(wrapper.text()).toContain("My task title");
  });
});
