import { render } from "vitest-browser-react";
import { DownloadManager } from "./download-manager";
import { userEvent } from "@vitest/browser/context";
import { expect, test, vi } from "vitest";

test("renders", () => {
  render(<DownloadManager files={[]} />);
});

test("Available rows can be selected by clicking the checkbox", async () => {
  const { getByRole } = render(
    <DownloadManager
      files={[
        {
          name: "selectable",
          device: "foo",
          path: "bar",
          status: "available",
        },
      ]}
    />,
  );

  const checkbox = getByRole("checkbox", { name: "foo" });
  await userEvent.click(checkbox);

  expect(checkbox).toBeChecked();
});

test("Available rows can be selected by clicking the row", async () => {
  const { getByRole } = render(
    <DownloadManager
      files={[
        {
          name: "selectable",
          device: "foo",
          path: "bar",
          status: "available",
        },
      ]}
    />,
  );

  const row = getByRole("row", { name: "foo" });
  await userEvent.click(row);
  const checkbox = getByRole("checkbox", { name: "foo" });

  expect(checkbox).toBeChecked();
});

test("Available rows can be un-selected via checkbox", async () => {
  const { getByRole } = render(
    <DownloadManager
      files={[
        {
          name: "selectable",
          device: "foo",
          path: "bar",
          status: "available",
        },
      ]}
    />,
  );

  const checkbox = getByRole("checkbox", { name: "foo" });
  await userEvent.click(checkbox);

  expect(checkbox).toBeChecked();
  await userEvent.click(checkbox);
  expect(checkbox).not.toBeChecked();
});

test("Available rows can be un-selected by clicking the row", async () => {
  const { getByRole } = render(
    <DownloadManager
      files={[
        {
          name: "selectable",
          device: "foo",
          path: "bar",
          status: "available",
        },
      ]}
    />,
  );

  const row = getByRole("row", { name: "foo" });
  await userEvent.click(row);
  const checkbox = getByRole("checkbox", { name: "foo" });

  expect(checkbox).toBeChecked();
  await userEvent.click(row);
  expect(checkbox).not.toBeChecked();
});

test("Unavailable rows cannot be selected via the checkbox", async () => {
  const { getByRole } = render(
    <DownloadManager
      files={[
        {
          name: "not selectable",
          device: "foo",
          path: "bar",
          status: "scheduled",
        },
      ]}
    />,
  );

  const checkbox = getByRole("checkbox", { name: "foo" });
  expect(checkbox).toBeDisabled();
});

test("Unvailable rows cannot be selected by clicking the row", async () => {
  const { getByRole } = render(
    <DownloadManager
      files={[
        {
          name: "selectable",
          device: "foo",
          path: "bar",
          status: "scheduled",
        },
      ]}
    />,
  );

  const row = getByRole("row", { name: "foo" });
  await userEvent.click(row);
  const checkbox = getByRole("checkbox", { name: "foo" });

  expect(checkbox).not.toBeChecked();
});

test("select all checkbox is unselected when no row selected", async () => {
  const { getByRole } = render(
    <DownloadManager
      files={[
        {
          name: "selectable",
          device: "foo",
          path: "bar",
          status: "available",
        },
      ]}
    />,
  );

  const checkbox = getByRole("checkbox", { name: "foo" });
  await userEvent.click(checkbox);

  expect(checkbox).toBeChecked();
});

test("select all checkbox is selected when all selectable rows selected", async () => {
  const { getByRole } = render(
    <DownloadManager
      files={[
        {
          name: "selectable",
          device: "foo",
          path: "bar",
          status: "available",
        },
        {
          name: "selectable2",
          device: "foo2",
          path: "bar",
          status: "available",
        },
        {
          name: "not selectable",
          device: "foo3",
          path: "bar",
          status: "scheduled",
        },
      ]}
    />,
  );

  const checkbox1 = getByRole("checkbox", { name: "selectable foo bar" });
  await userEvent.click(checkbox1);

  const checkbox2 = getByRole("checkbox", { name: "selectable2 foo2 bar" });
  await userEvent.click(checkbox2);

  const selectAllCheckbox = getByRole("checkbox", {
    name: "un-select all files",
  });

  expect(selectAllCheckbox).toBeChecked();
  expect(selectAllCheckbox).toHaveAttribute("state", "selected");
});
test("select all checkbox is indeterminate when some rows selected", async () => {
  const { getByRole } = render(
    <DownloadManager
      files={[
        {
          name: "selectable",
          device: "foo",
          path: "bar",
          status: "available",
        },
        {
          name: "selectable2",
          device: "foo2",
          path: "bar",
          status: "available",
        },
        {
          name: "not selectable",
          device: "foo3",
          path: "bar",
          status: "scheduled",
        },
      ]}
    />,
  );

  const checkbox1 = getByRole("checkbox", { name: "selectable foo bar" });
  await userEvent.click(checkbox1);

  const selectAllCheckbox = getByRole("checkbox", {
    name: "un-select all files",
  });

  expect(selectAllCheckbox).not.toBeChecked();
  expect(selectAllCheckbox).toHaveAttribute("state", "indeterminate");
});

test("select all checkbox is unselected when no rows selected", async () => {
  const { getByRole } = render(
    <DownloadManager
      files={[
        {
          name: "selectable",
          device: "foo",
          path: "bar",
          status: "available",
        },
        {
          name: "selectable2",
          device: "foo2",
          path: "bar",
          status: "available",
        },
        {
          name: "not selectable",
          device: "foo3",
          path: "bar",
          status: "scheduled",
        },
      ]}
    />,
  );

  const selectAllCheckbox = getByRole("checkbox", {
    name: "select all files",
  });

  expect(selectAllCheckbox).not.toBeChecked();
  expect(selectAllCheckbox).toHaveAttribute("state", "unselected");
});

test("select count should show the correct row count when some rows selected", async () => {
  const { getByRole, getByText } = render(
    <DownloadManager
      files={[
        {
          name: "selectable",
          device: "foo",
          path: "bar",
          status: "available",
        },
        {
          name: "selectable2",
          device: "foo2",
          path: "bar",
          status: "available",
        },
        {
          name: "not selectable",
          device: "foo3",
          path: "bar",
          status: "scheduled",
        },
      ]}
    />,
  );

  const checkbox1 = getByRole("checkbox", { name: "selectable foo bar" });
  await userEvent.click(checkbox1);

  expect(getByText("Selected 1")).toBeInTheDocument();
});

test("select count show none when no rows selected", async () => {
  async () => {
    const { getByText } = render(
      <DownloadManager
        files={[
          {
            name: "selectable",
            device: "foo",
            path: "bar",
            status: "available",
          },
          {
            name: "selectable2",
            device: "foo2",
            path: "bar",
            status: "available",
          },
          {
            name: "not selectable",
            device: "foo3",
            path: "bar",
            status: "scheduled",
          },
        ]}
      />,
    );

    expect(getByText("None Selected")).toBeInTheDocument();
  };
});

test("Clicking the select-all checkbox should select all items if none items are selected.", async () => {
  const { getByRole } = render(
    <DownloadManager
      files={[
        {
          name: "selectable",
          device: "foo",
          path: "bar",
          status: "available",
        },
        {
          name: "selectable2",
          device: "foo2",
          path: "bar",
          status: "available",
        },
        {
          name: "not selectable",
          device: "foo3",
          path: "bar",
          status: "scheduled",
        },
      ]}
    />,
  );

  const selectAllCheckbox = getByRole("checkbox", {
    name: "select all files",
  });

  await userEvent.click(selectAllCheckbox);

  const checkbox1 = getByRole("checkbox", { name: "selectable foo bar" });
  const checkbox2 = getByRole("checkbox", { name: "selectable2 foo2 bar" });
  expect(checkbox1).toBeChecked();
  expect(checkbox2).toBeChecked();
  expect(selectAllCheckbox).toBeChecked();
});
test("Clicking the select-all checkbox should select all items if some items are selected.", async () => {
  const { getByRole } = render(
    <DownloadManager
      files={[
        {
          name: "selectable",
          device: "foo",
          path: "bar",
          status: "available",
        },
        {
          name: "selectable2",
          device: "foo2",
          path: "bar",
          status: "available",
        },
        {
          name: "not selectable",
          device: "foo3",
          path: "bar",
          status: "scheduled",
        },
      ]}
    />,
  );

  const selectAllCheckbox = getByRole("checkbox", {
    name: "select all files",
  });
  const checkbox1 = getByRole("checkbox", { name: "selectable foo bar" });
  const checkbox2 = getByRole("checkbox", { name: "selectable2 foo2 bar" });

  await userEvent.click(checkbox1);

  expect(checkbox1).toBeChecked();
  expect(checkbox2).not.toBeChecked();
  expect(selectAllCheckbox).not.toBeChecked();

  await userEvent.click(selectAllCheckbox);

  expect(checkbox1).toBeChecked();
  expect(checkbox2).toBeChecked();
  expect(selectAllCheckbox).toBeChecked();
});
test("Clicking the select-all checkbox should de-select all items if all are selected", async () => {
  const { getByRole } = render(
    <DownloadManager
      files={[
        {
          name: "selectable",
          device: "foo",
          path: "bar",
          status: "available",
        },
        {
          name: "selectable2",
          device: "foo2",
          path: "bar",
          status: "available",
        },
        {
          name: "not selectable",
          device: "foo3",
          path: "bar",
          status: "scheduled",
        },
      ]}
    />,
  );

  const selectAllCheckbox = getByRole("checkbox", {
    name: "select all files",
  });
  const checkbox1 = getByRole("checkbox", { name: "selectable foo bar" });
  const checkbox2 = getByRole("checkbox", { name: "selectable2 foo2 bar" });

  await userEvent.click(checkbox1);
  await userEvent.click(checkbox2);

  expect(checkbox1).toBeChecked();
  expect(checkbox2).toBeChecked();
  expect(selectAllCheckbox).toBeChecked();

  await userEvent.click(selectAllCheckbox);

  expect(checkbox1).not.toBeChecked();
  expect(checkbox2).not.toBeChecked();
  expect(selectAllCheckbox).not.toBeChecked();
});
test("Status should be correctly formatted", async () => {
  const { getByText } = render(
    <DownloadManager
      files={[
        {
          name: "selectable",
          device: "foo",
          path: "bar",
          status: "available",
        },
        {
          name: "not selectable",
          device: "foo3",
          path: "bar",
          status: "scheduled",
        },
      ]}
    />,
  );

  expect(getByText("Available")).toBeInTheDocument();
  expect(getByText("Scheduled")).toBeInTheDocument();
});
test("Clicking Download Selected when some or all items are displayed should generate an alert box with the path and device of all selected files.", async () => {
  const mockAlert = vi.fn();
  vi.stubGlobal("alert", mockAlert);
  const { getByRole } = render(
    <DownloadManager
      files={[
        {
          name: "selectable",
          device: "foo",
          path: "bar",
          status: "available",
        },
        {
          name: "selectable2",
          device: "foo2",
          path: "bar2",
          status: "available",
        },
        {
          name: "not selectable",
          device: "foo3",
          path: "bar3",
          status: "scheduled",
        },
      ]}
    />,
  );

  const selectAllCheckbox = getByRole("checkbox", {
    name: "select all files",
  });

  await userEvent.click(selectAllCheckbox);

  const downloadButton = getByRole("button");

  await userEvent.click(downloadButton);

  expect(mockAlert).toHaveBeenCalledOnce();
  expect(mockAlert).toHaveBeenCalledWith(expect.stringMatching("foo"));
  expect(mockAlert).toHaveBeenCalledWith(expect.stringMatching("bar"));
  expect(mockAlert).toHaveBeenCalledWith(expect.stringMatching("foo2"));
  expect(mockAlert).toHaveBeenCalledWith(expect.stringMatching("bar2"));
  expect(mockAlert).not.toHaveBeenCalledWith(expect.stringMatching("foo3"));
  expect(mockAlert).not.toHaveBeenCalledWith(expect.stringMatching("bar3"));
});
test("Clicking Download Selected should not display an alert when none selected", async () => {
  const mockAlert = vi.fn();
  vi.stubGlobal("alert", mockAlert);
  const { getByRole } = render(
    <DownloadManager
      files={[
        {
          name: "selectable",
          device: "foo",
          path: "bar",
          status: "available",
        },
        {
          name: "selectable2",
          device: "foo2",
          path: "bar2",
          status: "available",
        },
        {
          name: "not selectable",
          device: "foo3",
          path: "bar3",
          status: "scheduled",
        },
      ]}
    />,
  );

  const downloadButton = getByRole("button");
  expect(downloadButton).toBeDisabled();
});
test("Rows change color on hover", async () => {
  const { getByRole } = render(
    <DownloadManager
      files={[
        {
          name: "selectable",
          device: "foo",
          path: "bar",
          status: "available",
        },
        {
          name: "selectable2",
          device: "foo2",
          path: "bar2",
          status: "available",
        },
        {
          name: "not selectable",
          device: "foo3",
          path: "bar3",
          status: "scheduled",
        },
      ]}
    />,
  );
  const row1 = getByRole("row", { name: "selectable foo bar" });
  expect(row1).toHaveClass("hover:bg-gray-50");
});

test("Rows change color on selected", async () => {
  const { getByRole } = render(
    <DownloadManager
      files={[
        {
          name: "selectable",
          device: "foo",
          path: "bar",
          status: "available",
        },
        {
          name: "selectable2",
          device: "foo2",
          path: "bar2",
          status: "available",
        },
        {
          name: "not selectable",
          device: "foo3",
          path: "bar3",
          status: "scheduled",
        },
      ]}
    />,
  );

  const row1 = getByRole("row", { name: "selectable foo bar" });
  expect(row1).not.toHaveClass("bg-gray-100");

  const checkbox1 = getByRole("checkbox", { name: "selectable foo bar" });
  await userEvent.click(checkbox1);
  expect(row1).toHaveClass("bg-gray-100");
});
