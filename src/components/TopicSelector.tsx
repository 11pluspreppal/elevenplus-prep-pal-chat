
import { Topic } from "@/utils/examTopics";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";

type TopicSelectorProps = {
  topics: Topic[];
  selectedTopicId: string | null;
  onSelectTopic: (topicId: string) => void;
};

const TopicSelector = ({ topics, selectedTopicId, onSelectTopic }: TopicSelectorProps) => {
  return (
    <div className="mt-6">
      <h2 className="text-lg font-medium mb-3">Choose a Topic</h2>
      <Card>
        <CardContent className="p-4">
          <RadioGroup 
            value={selectedTopicId || undefined} 
            onValueChange={onSelectTopic}
          >
            <div className="grid gap-3">
              {topics.map((topic) => (
                <div 
                  key={topic.id} 
                  className="flex items-start space-x-2 p-2 rounded hover:bg-muted/50 cursor-pointer"
                  onClick={() => onSelectTopic(topic.id)}
                >
                  <RadioGroupItem value={topic.id} id={`topic-${topic.id}`} className="mt-1" />
                  <div className="flex-1">
                    <Label 
                      htmlFor={`topic-${topic.id}`} 
                      className="font-medium cursor-pointer"
                    >
                      {topic.name}
                    </Label>
                    <p className="text-sm text-muted-foreground">{topic.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </RadioGroup>
        </CardContent>
      </Card>
    </div>
  );
};

export default TopicSelector;
