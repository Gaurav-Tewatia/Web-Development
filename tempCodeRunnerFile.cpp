#include <iostream>
#include <vector>
#include <algorithm>

class LiftConnector {
public:
    void openGate() {
        // Pseudo-code: Perform actions to open the lift gate.
        // Example: lift gate status = "open";
    }

    void closeGate() {
        // Pseudo-code: Perform actions to close the lift gate.
        // Example: lift gate status = "closed";
    }

    void stopLift() {
        // Pseudo-code: Perform actions to stop the lift.
        // Example: lift status = "stopped";
    }

    void moveUp() {
        // Pseudo-code: Perform actions to move the lift up.
        // Example: lift direction = "up";
    }

    void moveDown() {
        // Pseudo-code: Perform actions to move the lift down.
        // Example: lift direction = "down";
    }
};

class ButtonPanel {
private:
    LiftConnector& liftConnector;

public:
    ButtonPanel(LiftConnector& connector) : liftConnector(connector) {}

    void pressButton(int floor) {
        // Pseudo-code: Handle the button press event.
        // Example: Notify lift connector about the button press.
    }
};

class Lift {
private:
    int currentFloor;
    std::vector<int> destinationFloors;
    bool isMoving;
    LiftConnector liftConnector;
    ButtonPanel buttonPanel;

public:
    Lift() : currentFloor(0), isMoving(false), liftConnector(), buttonPanel(liftConnector) {}

    void pressButton(int floor) {
        buttonPanel.pressButton(floor);
        listenToButtonsPressed(floor);
    }

    void listenToButtonsPressed(int floor) {
        // Check if the lift is currently moving
        if (isMoving) {
            // If moving, store the new destination floor in the queue
            destinationFloors.push_back(floor);
        } else {
            // If not moving, update the queue and start moving to the new destination
            destinationFloors.push_back(floor);
            sortDestinationFloors();
            move();
        }
    }

    void sortDestinationFloors() {
        // Sort the destinationFloors based on proximity to the current floor and direction
        std::sort(destinationFloors.begin(), destinationFloors.end(),
            [this](int a, int b) {
                return std::abs(a - currentFloor) < std::abs(b - currentFloor);
            });

        // If the lift is moving up, keep only the floors above the current floor
        if (!destinationFloors.empty() && destinationFloors.front() > currentFloor) {
            auto it = std::partition(destinationFloors.begin(), destinationFloors.end(),
                [this](int floor) {
                    return floor > currentFloor;
                });
            destinationFloors.erase(it, destinationFloors.end());
        }
        // If the lift is moving down, keep only the floors below the current floor
        else if (!destinationFloors.empty() && destinationFloors.front() < currentFloor) {
            auto it = std::partition(destinationFloors.begin(), destinationFloors.end(),
                [this](int floor) {
                    return floor < currentFloor;
                });
            destinationFloors.erase(destinationFloors.begin(), it);
        }
    }

    void move() {
        if (!destinationFloors.empty()) {
            isMoving = true;
            int nextFloor = destinationFloors.front();
            destinationFloors.erase(destinationFloors.begin());

            if (nextFloor > currentFloor) {
                liftConnector.moveUp();
            } else if (nextFloor < currentFloor) {
                liftConnector.moveDown();
            } else {
                // Pseudo-code: Lift is already on the floor.
                // Example: lift status = "already on floor";
            }

            currentFloor = nextFloor;
            isMoving = false;
            // Check for additional destinations after completing the current movement
            if (!destinationFloors.empty()) {
                move();
            }
        } else {
            isMoving = false;
            // Pseudo-code: Lift is idle.
            // Example: lift status = "idle";
        }
    }
};

int main() {
    Lift lift;

    // Example: User presses buttons to go to different floors
    lift.pressButton(3);
    lift.pressButton(1);
    lift.pressButton(7);

    // Lift moves to the destination floors
    lift.move();

    // Simulate someone pressing a button while the lift is still moving
    lift.pressButton(5);

    // Continue moving to the remaining destination floors
    lift.move();
    lift.move();

    return 0;
}
